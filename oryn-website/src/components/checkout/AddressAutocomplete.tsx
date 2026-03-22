"use client";

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  interface Window {
    google?: typeof google;
  }
  namespace google.maps {
    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }
    namespace event {
      function clearInstanceListeners(instance: unknown): void;
    }
    namespace places {
      class Autocomplete {
        constructor(input: HTMLInputElement, opts?: Record<string, unknown>);
        addListener(event: string, handler: () => void): void;
        getPlace(): { address_components?: GeocoderAddressComponent[]; formatted_address?: string };
      }
    }
  }
}

import { useEffect, useRef, useState, useCallback } from "react";

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: {
    address: string;
    city: string;
    postalCode: string;
    country: string; // lowercase ISO 3166-1 alpha-2
  }) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  locale?: string;
}

let googleScriptLoaded = false;
let googleScriptLoading = false;
const loadCallbacks: (() => void)[] = [];

function loadGooglePlacesScript(locale: string): Promise<void> {
  return new Promise((resolve) => {
    if (googleScriptLoaded && window.google?.maps?.places) {
      resolve();
      return;
    }

    if (googleScriptLoading) {
      loadCallbacks.push(resolve);
      return;
    }

    if (!GOOGLE_PLACES_API_KEY) {
      resolve();
      return;
    }

    googleScriptLoading = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places&language=${locale}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleScriptLoaded = true;
      googleScriptLoading = false;
      resolve();
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };

    script.onerror = () => {
      googleScriptLoading = false;
      resolve(); // Graceful fallback
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };

    document.head.appendChild(script);
  });
}

function parseAddressComponents(
  components: google.maps.GeocoderAddressComponent[]
): { address: string; city: string; postalCode: string; country: string } {
  let streetNumber = "";
  let route = "";
  let city = "";
  let postalCode = "";
  let country = "";

  for (const component of components) {
    const types = component.types;
    if (types.includes("street_number")) {
      streetNumber = component.long_name;
    } else if (types.includes("route")) {
      route = component.long_name;
    } else if (types.includes("locality") || types.includes("postal_town")) {
      city = component.long_name;
    } else if (
      !city &&
      types.includes("administrative_area_level_2")
    ) {
      city = component.long_name;
    } else if (types.includes("postal_code")) {
      postalCode = component.long_name;
    } else if (types.includes("country")) {
      country = component.short_name.toLowerCase();
    }
  }

  const address = streetNumber
    ? `${route} ${streetNumber}`.trim()
    : route;

  return { address, city, postalCode, country };
}

export default function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder,
  className,
  error,
  locale = "en",
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [apiAvailable, setApiAvailable] = useState(false);

  const handlePlaceChanged = useCallback(() => {
    const autocomplete = autocompleteRef.current;
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place.address_components) return;

    const parsed = parseAddressComponents(place.address_components);

    // Update the input with the formatted address
    if (parsed.address) {
      onChange(parsed.address);
    }

    onPlaceSelect(parsed);
  }, [onChange, onPlaceSelect]);

  useEffect(() => {
    if (!GOOGLE_PLACES_API_KEY) return;

    let mounted = true;

    loadGooglePlacesScript(locale).then(() => {
      if (!mounted || !inputRef.current || !window.google?.maps?.places) return;

      setApiAvailable(true);

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["address"],
          fields: ["address_components", "formatted_address"],
        }
      );

      autocomplete.addListener("place_changed", handlePlaceChanged);
      autocompleteRef.current = autocomplete;
    });

    return () => {
      mounted = false;
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [locale, handlePlaceChanged]);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
        autoComplete={apiAvailable ? "off" : "address-line1"}
      />
      {apiAvailable && value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-oryn-black/20"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
      )}
      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
