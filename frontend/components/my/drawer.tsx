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

  const total =
    (cart?.items.reduce(
      (sum, item) => sum + Number(item.product.productPrice) * item.quantity,
      0,
    ) ?? 0).toFixed(2);

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
          <DrawerDescription>{total} LKR</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 scroll-fade overflow-y-auto p-4">
          <RadioGroup
            value={cart}
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
          <Button className="h-[34px]">
            Proceed to Payment
          </Button>
          <DrawerClose render={<Button variant="outline">Cancel</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
