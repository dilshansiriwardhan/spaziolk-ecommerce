"use client";

import * as React from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { getCartAction } from "@/app/actions/add-to-cart";
import type { Cart } from "@/lib/add-cart";

const deliveryTimes = [
  {
    value: "asap",
    id: "delivery-asap",
    label: "Standard delivery",
    description: "25–35 min · Driver assigned now",
    badge: "Fastest",
  },
  {
    value: "5-00",
    id: "delivery-5-00",
    label: "5:00 PM – 5:15 PM",
    description: "Prep starts at 4:45 PM",
  },
  {
    value: "5-30",
    id: "delivery-5-30",
    label: "5:30 PM – 5:45 PM",
    description: "Good if you're heading home",
  },
  {
    value: "6-00",
    id: "delivery-6-00",
    label: "6:00 PM – 6:15 PM",
    description: "Most popular · High demand",
  },
  {
    value: "6-30",
    id: "delivery-6-30",
    label: "6:30 PM – 6:45 PM",
    description: "Last slot before kitchen closes",
  },
];

type DrawerDemoProps = {
  trigger: React.ReactElement;
};

export function DrawerDemo({ trigger }: DrawerDemoProps) {
  const [open, setOpen] = React.useState(false);
  const [deliveryTime, setDeliveryTime] = React.useState("asap");
  const isMobile = useIsMobile();

  const [cart, setCart] = React.useState<Cart>(null);

  useEffect(() => {
    if (open) {
      getCartAction().then(setCart);
      console.log(cart);
    }
  }, [open]);

  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime);

    if (!selected) {
      return;
    }

    setOpen(false);
    toast("Delivery time confirmed", {
      description: selected.label,
    });
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
    >
      <DrawerTrigger render={trigger} nativeButton={false} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Cart</DrawerTitle>
          <DrawerDescription>
            This is your cart Item section
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup
            value={cart}
            onValueChange={setDeliveryTime}
            className="gap-2"
          >
            {cart?.items.map((item) => (
              <FieldLabel key={item.id} htmlFor={item.id}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle className="flex items-center gap-2">
                      {item.product.productName}
                      {item.variant ? (
                        <Badge variant="secondary">{item.variant.color}</Badge>
                      ) : null}
                    </FieldTitle>
                    <FieldDescription>{item.quantity}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={item.cartId} id={item.id} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </div>
        <DrawerFooter>
          <Button onClick={handleConfirm} className="h-[34px]">
            Proceed to Payment
          </Button>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
