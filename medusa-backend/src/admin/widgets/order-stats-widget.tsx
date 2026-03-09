import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, Badge } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types"

const formatCurrency = (amount: number, currency = "gbp") => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount)
}

const OrderStatsWidget = ({ data: order }: DetailWidgetProps<AdminOrder>) => {
  const [customerOrders, setCustomerOrders] = useState<number>(0)
  const [customerLTV, setCustomerLTV] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!order?.email) {
      setLoading(false)
      return
    }

    fetch(`/admin/orders?limit=100&fields=id,total,currency_code&q=${encodeURIComponent(order.email)}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const orders = data.orders || []
        setCustomerOrders(orders.length)
        setCustomerLTV(orders.reduce((sum: number, o: { total?: number }) => sum + (o.total || 0), 0))
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [order?.email])

  const isRepeat = customerOrders > 1

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Customer Insights</Heading>
        {isRepeat && <Badge color="purple" size="xsmall">Repeat Customer</Badge>}
      </div>
      <div className="px-6 py-4">
        {loading ? (
          <Text className="text-ui-fg-muted">Loading...</Text>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text size="xsmall" className="text-ui-fg-muted mb-1">Total Orders</Text>
              <Text className="text-lg font-semibold">{customerOrders}</Text>
            </div>
            <div>
              <Text size="xsmall" className="text-ui-fg-muted mb-1">Lifetime Value</Text>
              <Text className="text-lg font-semibold">
                {formatCurrency(customerLTV, order.currency_code || "gbp")}
              </Text>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details.side.before",
})

export default OrderStatsWidget
