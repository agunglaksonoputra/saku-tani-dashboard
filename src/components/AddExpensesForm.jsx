import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FormField } from "./FormField";
import { DatePickerField } from "./DatePickerField";
import { SelectField } from "./SelectField";
import { useMasterData } from "@/hooks/useMasterData";
import { useExpensesForm } from "@/hooks/useExpensesForm";

const AddExpensesForm = () => {
  const { units } = useMasterData();
  const { formData, selectedDate, loading, error, setSelectedDate, handleChange, handleSelectChange, handleSubmit, handleCancel } = useExpensesForm();

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Left Column */}
        <div className="space-y-4">
          <DatePickerField selectedDate={selectedDate} onDateSelect={setSelectedDate} />

          <FormField label="Nama Item" name="name" type="yext" value={formData.name} onChange={handleChange} required />
        </div>
        {/* Right Column */}
        <div className="space-y-4">
          <FormField label="Jumlah" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />

          <div className="flex justify-between gap-2">
            <FormField label="Harga per Unit" name="price_per_unit" type="number" value={formData.price_per_unit} onChange={handleChange} required />

            <SelectField label="Unit" value={formData.unit} onValueChange={(value) => handleSelectChange("unit", value)} placeholder="Pilih unit" options={units} required />
          </div>

          <div className="flex justify-between gap-2">
            <FormField label="Harga Ongkir" name="shipping_cost" type="number" value={formData.shipping_cost} onChange={handleChange} />

            <FormField label="Harga Diskon" name="discount" type="number" value={formData.discount} onChange={handleChange} />
          </div>
          <FormField label="Total Harga" name="total_price" type="number" value={formData.total_price} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-8">
        {/* Notes */}
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="notes">Catatan</Label>
          <Textarea name="notes" value={formData.notes} onChange={handleChange} />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Batal
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddExpensesForm;
