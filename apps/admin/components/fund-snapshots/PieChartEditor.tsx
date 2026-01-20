"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFieldArray, Control, UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

type PieChartEditorProps = {
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string;
  title: string;
};

export function PieChartEditor({
  control,
  register,
  name,
  title,
}: PieChartEditorProps) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <p className="font-semibold">{title}</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ label: "", value: 0 })}
          >
            Add Factor
          </Button>
        </div>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end"
            >
              <div className="md:col-span-3 space-y-1">
                <Label>Label</Label>
                <Input
                  {...register(`${name}.${index}.label` as const)}
                  placeholder="Label"
                />
              </div>
              <div className="md:col-span-2 space-y-1">
                <Label>Value</Label>
                <Input
                  type="number"
                  step="any"
                  {...register(`${name}.${index}.value` as const, {
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
              No factors added yet. Click &quot;Add Factor&quot; to begin.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
