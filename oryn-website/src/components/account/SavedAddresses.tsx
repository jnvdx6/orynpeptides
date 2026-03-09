"use client";

import { useState, useEffect } from "react";

export interface SavedAddress {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const STORAGE_KEY = "oryn_saved_addresses";

function loadAddresses(): SavedAddress[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAddresses(addresses: SavedAddress[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
}

export function useSavedAddresses() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);

  useEffect(() => {
    setAddresses(loadAddresses());
  }, []);

  const add = (address: Omit<SavedAddress, "id">) => {
    const newAddr: SavedAddress = { ...address, id: `addr_${Date.now()}` };
    // If this is default, unset others
    const updated = address.isDefault
      ? addresses.map((a) => ({ ...a, isDefault: false }))
      : [...addresses];
    updated.push(newAddr);
    setAddresses(updated);
    saveAddresses(updated);
  };

  const remove = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    saveAddresses(updated);
  };

  const setDefault = (id: string) => {
    const updated = addresses.map((a) => ({ ...a, isDefault: a.id === id }));
    setAddresses(updated);
    saveAddresses(updated);
  };

  const getDefault = () => addresses.find((a) => a.isDefault) || addresses[0];

  return { addresses, add, remove, setDefault, getDefault };
}

export function SavedAddresses() {
  const { addresses, add, remove, setDefault } = useSavedAddresses();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    label: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postcode: "",
    country: "GB",
    phone: "",
    isDefault: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    add(form);
    setForm({
      label: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postcode: "",
      country: "GB",
      phone: "",
      isDefault: false,
    });
    setShowForm(false);
  };

  return (
    <div className="bg-white border border-oryn-grey/15 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em]">
          SAVED ADDRESSES
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="text-[10px] font-mono text-oryn-orange tracking-[0.1em] hover:text-oryn-orange-dark transition-colors"
        >
          {showForm ? "CANCEL" : "+ ADD ADDRESS"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-3 mb-6 p-4 bg-oryn-cream/30 border border-oryn-grey/10">
          <div>
            <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1">
              LABEL (e.g. Home, Office)
            </label>
            <input
              type="text"
              value={form.label}
              onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
              required
              className="w-full px-3 py-2 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange"
              placeholder="Home"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1">FIRST NAME</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1">LAST NAME</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange"
              />
            </div>
          </div>
          <div>
            <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1">ADDRESS</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              required
              className="w-full px-3 py-2 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1">CITY</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1">POSTCODE</label>
              <input
                type="text"
                value={form.postcode}
                onChange={(e) => setForm((p) => ({ ...p, postcode: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange"
              />
            </div>
            <div>
              <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1">COUNTRY</label>
              <select
                value={form.country}
                onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                className="w-full px-3 py-2 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange"
              >
                <option value="GB">United Kingdom</option>
                <option value="ES">Spain</option>
                <option value="IE">Ireland</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="NL">Netherlands</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1">PHONE</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-oryn-grey/30 text-sm font-plex focus:outline-none focus:border-oryn-orange"
            />
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => setForm((p) => ({ ...p, isDefault: e.target.checked }))}
              className="accent-oryn-orange"
            />
            <span className="text-[10px] text-oryn-black/50 font-plex">Set as default address</span>
          </label>
          <button
            type="submit"
            className="px-5 py-2.5 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
          >
            SAVE ADDRESS
          </button>
        </form>
      )}

      {addresses.length === 0 && !showForm ? (
        <p className="text-xs text-oryn-black/40 font-plex py-4">
          No saved addresses. Add one for faster checkout.
        </p>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-4 border transition-colors ${
                addr.isDefault ? "border-oryn-orange/30 bg-oryn-orange/5" : "border-oryn-grey/15"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">{addr.label}</span>
                  {addr.isDefault && (
                    <span className="px-1.5 py-0.5 bg-oryn-orange text-white text-[8px] font-mono tracking-[0.1em]">
                      DEFAULT
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefault(addr.id)}
                      className="text-[9px] text-oryn-black/40 hover:text-oryn-orange font-mono tracking-[0.1em]"
                    >
                      SET DEFAULT
                    </button>
                  )}
                  <button
                    onClick={() => remove(addr.id)}
                    className="text-[9px] text-red-400 hover:text-red-600 font-mono tracking-[0.1em]"
                  >
                    REMOVE
                  </button>
                </div>
              </div>
              <p className="text-xs text-oryn-black/60 font-plex">
                {addr.firstName} {addr.lastName}
              </p>
              <p className="text-xs text-oryn-black/40 font-plex">
                {addr.address}, {addr.city}, {addr.postcode}
              </p>
              {addr.phone && (
                <p className="text-xs text-oryn-black/40 font-plex">{addr.phone}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
