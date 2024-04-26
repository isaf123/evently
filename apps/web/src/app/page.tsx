import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ComboboxDemo } from '@/components/ui/combobox';

export default function Home() {
  return (
    <main>
      <Header />
      <Button variant="outline" type="button" className="bg-red-600">
        Click
      </Button>
      <ComboboxDemo></ComboboxDemo>
      <Footer />
    </main>
  );
}
