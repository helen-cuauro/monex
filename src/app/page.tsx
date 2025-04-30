import DollarExchange from "@/components/DollarExchange";
import DollarPrice from "@/components/DollarPrice";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import Container from "@mui/material/Container";

export default function Home() {
  return (
    <div>
      <Container maxWidth="lg">
        <WhatsAppBanner />
        <div className="flex flex-col gap-8">
          <DollarExchange />
          <DollarPrice />
        </div>
      </Container>
    </div>
  );
}
