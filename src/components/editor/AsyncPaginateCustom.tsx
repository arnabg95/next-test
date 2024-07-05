import { fetchAllCat } from "@/http/helper";
import { AsyncPaginate } from "react-select-async-paginate";

export type OptionType = {
  value: string;
  label: string;
};

const optionsPerPage = 10;

type AdditionalType = {
  page: number;
};

const defaultAdditional: AdditionalType = {
  page: 1,
};

export const loadOptions = async (search: string, page: number) => {
  const data = await fetchAllCat(
    "web/categories",
    page,
    optionsPerPage,
    search
  );

  const options = data.categories.data.map(
    (item: { _id: string; title: string }) => {
      return { value: item._id, label: item.title };
    }
  );

  const hasMore =
    data.categories.pagination.page < data.categories.pagination.totalPages;

  return {
    options,
    hasMore,
  };
};

const loadPageOptions = async (
  q: string,
  prevOptions: unknown,
  { page }: AdditionalType
) => {
  const { options, hasMore } = await loadOptions(q, page);

  return {
    options,
    hasMore,
    additional: {
      page: page + 1,
    },
  };
};

export default function AsyncPaginateCustom({ value, onChange }: any) {
  return (
    <AsyncPaginate
      additional={defaultAdditional}
      value={value}
      loadOptions={loadPageOptions as any}
      onChange={onChange}
    />
  );
}
