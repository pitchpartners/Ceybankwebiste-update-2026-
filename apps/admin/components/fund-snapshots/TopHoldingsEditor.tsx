"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
};

export function TopHoldingsEditor({
  control,
  register,
  name,
}: Props) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Top Holdings</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: "", weight: undefined })}
          >
            Add Holding
          </Button>
        </div>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end"
            >
              <div className="md:col-span-4 space-y-1">
                <Label>Name</Label>
                <Input
                  {...register(`${name}.${index}.name` as const)}
                  placeholder="Holding name"
                />
              </div>
              <div className="md:col-span-1 space-y-1">
                <Label>Weight</Label>
                <Input
                  type="number"
                  step="any"
                  {...register(`${name}.${index}.weight` as const, {
                    valueAsNumber: true,
                  })}
                  placeholder="0"
                />
              </div>
              <div className="md:col-span-1">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No holdings added yet. Click &quot;Add Holding&quot; to begin.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
