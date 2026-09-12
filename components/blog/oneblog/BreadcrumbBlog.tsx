import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"

function BreadcrumbBlog() {
    return (
        <Breadcrumb className="pb-4 px-1">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild><Link href="/blog">Blogs</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink>
                        this.
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList >
        </Breadcrumb>
    )
}

export default BreadcrumbBlog
