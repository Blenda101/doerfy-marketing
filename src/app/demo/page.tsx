import SecondBrainMap from '@/components/SecondBrainMap';

export const metadata = {
  title: 'Second Brain Map — Demo',
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <SecondBrainMap />
    </main>
  );
}
