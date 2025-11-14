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
  'infrastructure',
  'environment',
  'education',
  'health',
  'culture',
  'sports',
  'social',
  'other'
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
        toast.error('You must be authenticated');
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

      toast.success('Initiative created successfully!');
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
      toast.error('Error creating initiative');
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
          <DialogTitle>Create New Initiative</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Initiative title"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed description of the initiative"
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category</label>
            <Select
              required
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
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
            <label className="text-sm font-medium">County</label>
            <Select
              required
              value={formData.county_id}
              onValueChange={(value) => setFormData({ ...formData, county_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select county" />
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
            <label className="text-sm font-medium">Location</label>
            <Input
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City/Town"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                required
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
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
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Initiative'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
