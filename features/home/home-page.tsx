import { Container } from "@/components/ui/container";
import { FinalCta } from "@/features/home/components/final-cta";
import { HeroSheet } from "@/features/home/components/hero-sheet";
import { HomeSection } from "@/features/home/components/home-section";
import { HOME_BLOCKS } from "@/features/home/data/home";

export function HomePage() {
  return (
    <>
      <div className="mx-2 sm:mx-3 lg:mx-4">
        <HeroSheet />
      </div>

      <Container className="pb-8 sm:pb-10 lg:pb-14">
        <div className="mt-12 border-b border-hairline sm:mt-16">
          {HOME_BLOCKS.map((block) => (
            <HomeSection key={block.id} block={block} />
          ))}
        </div>

        <FinalCta />
      </Container>
    </>
  );
}
