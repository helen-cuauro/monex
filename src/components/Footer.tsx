import { Container } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center py-4 bg-[#FACC15] text-sm text-gray-600">
      <Container maxWidth="lg">
        <Link href="/term-cond" className="hover:underline">
          Términos y Condiciones
        </Link>
      </Container>
    </footer>
  );
}
