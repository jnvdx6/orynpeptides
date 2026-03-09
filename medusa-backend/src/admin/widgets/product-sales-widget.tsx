import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"

const formatCurrency = (amount: number, currency = "gbp") => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount)
}

const ProductSalesWidget = ({ data: product }: DetailWidgetProps<AdminProduct>) => {
  const [totalSold, setTotalSold] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!product?.id) {
      setLoading(false)
      return
    }

    fetch(`/admin/orders?limit=100&fields=id,total,items.*`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const orders = data.orders || []
        let sold = 0
        let revenue = 0

        orders.forEach((order: { items?: { product_id?: string; variant_id?: string; quantity: number; unit_price: number }[] }) => {
          order.items?.forEach((item) => {
            const variantIds = product.variants?.map((v) => v.id) || []
            if (item.product_id === product.id || variantIds.includes(item.variant_id || "")) {
              sold += item.quantity
              revenue += item.unit_price * item.quantity
            }
          })
        })

        setTotalSold(sold)
        setTotalRevenue(revenue)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [product?.id])

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        <Heading level="h2">Sales Performance</Heading>
      </div>
      <div className="px-6 py-4">
        {loading ? (
          <Text className="text-ui-fg-muted">Loading...</Text>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text size="xsmall" className="text-ui-fg-muted mb-1">Units Sold</Text>
              <Text className="text-lg font-semibold">{totalSold}</Text>
            </div>
            <div>
              <Text size="xsmall" className="text-ui-fg-muted mb-1">Revenue</Text>
              <Text className="text-lg font-semibold">{formatCurrency(totalRevenue)}</Text>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
})

export default ProductSalesWidget
