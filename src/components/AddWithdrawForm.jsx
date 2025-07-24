import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useProfitShare } from "@/hooks/useProfitShare";
import { SelectField } from "./SelectField";
import { FormField, FormFieldWithButton } from "./FormField";
import { DatePickerField } from "./DatePickerField";

const AddWithdrawForm = ({ open, onOpenChange }) => {
  const { formData, selectedDate, ownerBalance, handleSubmit, setSelectedDate, handleSelectChange, handleMaxClick, setJumlah } = useProfitShare();

  const isFormValid = formData.name && formData.amount && parseFloat(formData.amount) > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Bagi Hasil</DialogTitle>
        </DialogHeader>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <DatePickerField selectedDate={selectedDate} onDateSelect={setSelectedDate} />
          <div className="grid grid-cols-2 gap-2">
            <SelectField label="Nama" value={formData.name} onValueChange={(value) => handleSelectChange("name", value)} optionKey="name" placeholder="Pilih unit" options={ownerBalance} className="w-full" required />

            {/* <FormField label="Jumlah" name="amount" type="number" value={formData.amount} required /> */}
            <FormFieldWithButton label="Jumlah" name="amount" type="number" value={formData.amount} onChange={(e) => setJumlah(e.target.value)} placeholder="Masukkan jumlah" buttonLabel="Max" onButtonClick={handleMaxClick} required />
          </div>

          <p className="text-right text-sm text-muted-foreground">Saldo tersedia: {ownerBalance.find((o) => o.name === formData.name)?.balance ?? "-"}</p>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
              Batal
            </Button>
            <Button variant="success" type="submit" disabled={!isFormValid}>
              Simpan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWithdrawForm;
