import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMasterData } from "@/hooks/useMasterData";
import { useSalesForm } from "@/hooks/useSalesForm";
import { DatePickerField } from "./DatePickerField";
import { SearchableInput } from "./SearchableInput";
import { FormField } from "./FormField";
import { SelectField } from "./SelectField";

const AddSalesForm = () => {
  const { customers, items, units, loading: loadingMaster } = useMasterData();
  const { formData, selectedDate, loading, error, setSelectedDate, handleChange, handleSelectChange, handleSubmit, handleCancel } = useSalesForm();

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

          <SearchableInput label="Pelanggan" name="customer" value={formData.customer} onChange={handleChange} placeholder="Ketik atau pilih pelanggan" options={customers} onOptionSelect={(value) => handleSelectChange("customer", value)} required />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <SearchableInput label="Sayuran" name="item_name" value={formData.item_name} onChange={handleChange} placeholder="Ketik atau pilih sayuran" options={items} onOptionSelect={(value) => handleSelectChange("item_name", value)} required />

          <div className="flex justify-between gap-2">
            <FormField label="Jumlah" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />

            <SelectField label="Unit" value={formData.unit} onValueChange={(value) => handleSelectChange("unit", value)} placeholder="Pilih unit" options={units} />
          </div>

          <div className="flex justify-between gap-2">
            <FormField label="Harga per Unit" name="price_per_unit" type="number" value={formData.price_per_unit} onChange={handleChange} />

            <FormField label="Berat per Unit (gram)" name="weight_per_unit_gram" type="number" value={formData.weight_per_unit_gram} onChange={handleChange} />
          </div>

          <div className="flex justify-between gap-2">
            <FormField label="Total Harga" name="total_price" type="number" value={formData.total_price} onChange={handleChange} required />

            <FormField label="Total Berat (kg)" name="total_weight_kg" type="number" value={formData.total_weight_kg} onChange={handleChange} required />
          </div>
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
          <Button type="submit" disabled={loading || loadingMaster}>
            {loading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddSalesForm;
