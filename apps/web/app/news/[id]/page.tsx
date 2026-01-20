import Image from "next/image";
import { notFound } from "next/navigation";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { getNewsByIdOrSlug } from "@/services/newsService";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type PageProps = { params: Promise<{ id: string }> };

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  const month = date.toLocaleString("default", { month: "long" });
  return `${day}${suffix} ${month} ${date.getFullYear()}`;
};

export default async function News({ params }: PageProps) {
  const { id } = await params;
  try {
    const news = await getNewsByIdOrSlug(id);
    const paragraphs = news.content ? news.content.split(/\n+/).filter(Boolean) : [];
    const gallery = news.images || [];

    return (
      <div className="flex flex-col">
        {/* breadcrumbs section */}
        <div className="min-h-[200px] lg:min-h-[300px] h-[20vh] flex flex-col items-center justify-center gap-4">
          <p className="text-center font-bold text-2xl lg:text-5xl">News</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href={appRoute.home}>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>News</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {/* trusted by */}
        <div className="bg-background">
          <div className="container my-20">
            <div className="w-full aspect-video relative overflow-hidden rounded-xl">
              <Image fill className="object-cover" src={news.coverImageUrl || "/images/news/dansala.jpg"} alt={news.title} />
            </div>
            <p className="text-black/80 text-sm lg:text-xl font-light text-start lg:text-end mt-2">{formatDate(news.publishedAt)}</p>
            <p className="text-2xl lg:text-3xl font-semibold text-primary mt-2">{news.title}</p>
            {paragraphs.length ? (
              paragraphs.map((paragraph, idx) => (
                <p key={idx} className={`text-black/80 text-xl font-light ${idx === 0 ? "mt-6" : "mt-4"}`}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="text-black/80 text-xl font-light mt-6">{news.excerpt}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8 my-10">
              {gallery.map((image, index) => (
                <FadeIn delay={index / 10} key={image.id} className="w-full aspect-video space-y-2 hover:shadow-lg p-4 lg:p-8 rounded-lg overflow-hidden relative">
                  <Image fill className="object-cover" src={image.imageUrl || news.coverImageUrl || "/images/news/dansala.jpg"} alt={news.title} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (err: unknown) {
    if (err && typeof err === "object" && "status" in err && (err as { status?: number }).status === 404) {
      notFound();
    }
    throw err;
  }
}
