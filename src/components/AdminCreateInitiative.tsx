import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';

const categories = [
  'infrastructură',
  'mediu',
  'educație',
  'sănătate',
  'cultură',
  'sport',
  'social',
  'altele'
];

export const AdminCreateInitiative = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    county_id: '',
    start_date: '',
    end_date: ''
  });

  const { data: counties } = useQuery({
    queryKey: ['counties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('counties')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error('Trebuie să fii autentificat');
        return;
      }

      const { error } = await supabase
        .from('initiatives')
        .insert({
          ...formData,
          created_by: user.id,
          status: 'active'
        });

      if (error) throw error;

      toast.success('Inițiativa a fost creată cu succes!');
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        county_id: '',
        start_date: '',
        end_date: ''
      });
      
      window.location.reload();
    } catch (error) {
      console.error('Error creating initiative:', error);
      toast.error('Eroare la crearea inițiativei');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg">
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Creează Inițiativă Nouă</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Titlu</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Titlul inițiativei"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Descriere</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrierea detaliată a inițiativei"
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Categorie</label>
            <Select
              required
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selectează categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Județ</label>
            <Select
              required
              value={formData.county_id}
              onValueChange={(value) => setFormData({ ...formData, county_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selectează județul" />
              </SelectTrigger>
              <SelectContent>
                {counties?.map((county) => (
                  <SelectItem key={county.id} value={county.id}>
                    {county.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Localitate</label>
            <Input
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Oraș/Comună"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Data începerii</label>
              <Input
                required
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Data finalizării</label>
              <Input
                required
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Anulează
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Se creează...' : 'Creează Inițiativa'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
