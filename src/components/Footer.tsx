import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center py-4 bg-gray-100 text-sm text-gray-600">
      <Link href="/term-cond" className="hover:underline">
        Términos y Condiciones
      </Link>
    </footer>
  );
}
