import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface CreateDealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newDeal: {
    title: string;
    description: string;
    price: string;
  };
  onDealChange: (deal: { title: string; description: string; price: string }) => void;
  onSubmit: () => void;
  creating: boolean;
}

export const CreateDealDialog = ({
  open,
  onOpenChange,
  newDeal,
  onDealChange,
  onSubmit,
  creating
}: CreateDealDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать объявление</DialogTitle>
          <DialogDescription>
            Создайте объявление о продаже. Средства будут заблокированы до подтверждения получения покупателем
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Название</Label>
            <Input
              value={newDeal.title}
              onChange={(e) => onDealChange({ ...newDeal, title: e.target.value })}
              placeholder="Например: Flash USDT 100K"
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Textarea
              value={newDeal.description}
              onChange={(e) => onDealChange({ ...newDeal, description: e.target.value })}
              placeholder="Подробное описание товара/услуги"
              rows={4}
            />
          </div>
          <div>
            <Label>Цена (USDT)</Label>
            <Input
              type="number"
              value={newDeal.price}
              onChange={(e) => onDealChange({ ...newDeal, price: e.target.value })}
              placeholder="100"
              min="0"
              step="0.01"
            />
          </div>
          <Button onClick={onSubmit} disabled={creating} className="w-full">
            <Icon name="Plus" size={18} className="mr-2" />
            {creating ? 'Создание...' : 'Создать объявление'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
