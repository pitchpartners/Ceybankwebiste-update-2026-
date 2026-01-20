import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/fade-in";
import { appRoute } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { getNews } from "@/services/newsService";

type PageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
  }>;
};

const DEFAULT_LIMIT = 4;

export default async function News({ searchParams }: PageProps) {
  const resolvedSearch = searchParams ? await searchParams : undefined;
  const pageParam = Number(resolvedSearch?.page);
  const limitParam = Number(resolvedSearch?.limit);
  const page = !Number.isNaN(pageParam) && pageParam > 0 ? pageParam : 1;
  const limit = !Number.isNaN(limitParam) && limitParam > 0 ? limitParam : DEFAULT_LIMIT;

  const data = await getNews({ page, limit });
  const items = data.items || [];
  const pagination = data.pagination;
  const totalPages = pagination?.totalPages ?? 0;
  const currentPage = pagination?.page ?? page;

  const buildPageHref = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (pageNumber > 1) params.set("page", pageNumber.toString());
    if (limit !== DEFAULT_LIMIT) params.set("limit", limit.toString());
    const query = params.toString();
    return query ? `?${query}` : "";
  };

  const pages = (() => {
    const total = totalPages || 1;
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const range = [1, total];
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(total - 1, currentPage + 1);
    if (start > 2) range.push(-1);
    for (let i = start; i <= end; i += 1) {
      range.push(i);
    }
    if (end < total - 1) range.push(-1);
    return range;
  })();

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
          <div className="flex justify-center items-center gap-2">
            <div className="h-[4px] w-8 lg:h-[6px] lg:w-10 bg-secondary"></div>
            <p className="lg:text-xl text-primary-foreground uppercase font-medium">News</p>
          </div>
          <p className="text-2xl lg:text-3xl font-semibold text-primary text-center mt-2">Ceybank Latest News</p>
          <p className="mt-4 lg:text-2xl text-center text-black/70 font-light max-w-5xl mx-auto">Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8 my-10">
            {items.length ? (
              items.map((item, index) => (
                <FadeIn delay={index / 10} key={item.id} className="w-full space-y-2 h-auto hover:shadow-lg p-4 lg:p-8 rounded-2xl border border-border">
                  <div className="w-full aspect-video bg-primary rounded-xl relative overflow-hidden">
                    <Image fill className="object-cover" src={item.coverImageUrl || "/images/news/dansala.jpg"} alt={item.title} />
                  </div>
                  <p className="text-primary text-2xl font-semibold mt-6">{item.title}</p>
                  <p className="text-black/60 font-light">{item.excerpt}</p>
                  <Button variant={"link"} className="px-0 underline cursor-pointer" asChild>
                    <Link href={`${appRoute.news}/${item.slug || item.id}`}>Read more</Link>
                  </Button>
                </FadeIn>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">No news available.</p>
            )}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={currentPage > 1 ? buildPageHref(currentPage - 1) : "#"} aria-disabled={currentPage <= 1} />
              </PaginationItem>
              {pages.map((p, idx) =>
                p === -1 ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink href={buildPageHref(p)} isActive={p === currentPage}>
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext href={currentPage < (totalPages || 1) ? buildPageHref(currentPage + 1) : "#"} aria-disabled={currentPage >= (totalPages || 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
