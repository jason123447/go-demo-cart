import { MatFormFieldAppearance } from "@angular/material/form-field";
import { MatPaginator, MatPaginatorDefaultOptions } from "@angular/material/paginator";

interface AppPaginatorDefaultOptions {
    page?: number;
    pageIndex?: number;
    pageSize?: number;
    pageSizeOptions?: number[];
    showFirstLastButtons?: boolean;
    formFieldAppearance?: MatFormFieldAppearance;
    length?: number;
}
export const paginatorConfig: AppPaginatorDefaultOptions = {
    page: 1,
    pageIndex: 0,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20],
    showFirstLastButtons: true,
    formFieldAppearance: 'fill',
    length: 0,
}