export default function Footer({ txt }: { txt: string }) {
  return (
    <footer className="bg-blue-800 text-white text-center py-4 mt-10 shadow-inner">
      <p>{txt}</p>
    </footer>
  );
}