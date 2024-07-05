"use client";
import Button from "@/components/common/Button";
import InputField from "@/components/common/InputField";
import { useState, useEffect } from "react";
import { Chips } from "primereact/chips";
import ImageUploader from "@/components/common/ImageUploader";
import { TriggerSwal } from "@/components/swal/index";
import { updatePost, getPostDetails } from "@/http/helper";
import AsyncPaginateCustom from "@/components/editor/AsyncPaginateCustom";
import dynamic from "next/dynamic";
import useSWR from "swr";
import SkeletonLoader from "@/components/common/SkeletonLoader";

const Editor = dynamic(() => import("@/components/editor/Editor"), {
  ssr: false,
});

const EditPost = ({ params }: { params: { slug: String } }) => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [banner, setBanner] = useState<string>("");
  const [value, onChange] = useState<any>(null);

  const { data, mutate, isLoading } = useSWR(
    `web/post-details/${params.slug}`,
    getPostDetails,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    setTitle(data?.title);
    setBody(data?.body);
    setTags(data?.tags);
    setBanner(data?.image);
    onChange({ value: data?.category?._id, label: data?.category?.title });
  }, [data]);

  const handleSubmit = async () => {
    if (title === "") {
      return TriggerSwal(
        "Post Title Required",
        "Please Add The Post Title",
        "warning"
      );
    }

    if (!value?.value) {
      return TriggerSwal(
        "Post Category Required",
        "Please Select The Post Category",
        "warning"
      );
    }

    if (!tags.length) {
      return TriggerSwal(
        "Tags Required",
        "Please Add At-least One Tag",
        "warning"
      );
    }

    if (body === "") {
      return TriggerSwal(
        "Post Body Required",
        "Please Add The Post Body",
        "warning"
      );
    }

    await updatePost(
      `web/update-post/${params.slug}`,
      JSON.stringify({
        title,
        image: banner,
        body: encodeURIComponent(body),
        category: value?.value,
        tags,
      })
    );

    mutate();
  };

  const handleClear = async () => {
    setTitle("");
    setTags([]);
    onChange(null);
    setBanner("");
    setBody("");
  };

  if (isLoading) return <SkeletonLoader />;
  return (
    <>
      {data ? (
        <div className="col-lg-8">
          <div className="edit-post-wrap">
            <h2>Edit Post</h2>
            <div className="white-bg-shw">
              <form>
                <div className="form-group">
                  <label htmlFor="">Post Banner</label>
                  <ImageUploader image={banner} setImage={setBanner} />
                </div>
                <div className="form-group">
                  <InputField
                    type="text"
                    placeholder="Enter Post Title"
                    label="Post Title *"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Post Category *</label>
                  <AsyncPaginateCustom value={value} onChange={onChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="">Tags *</label>
                  <Chips
                    placeholder="Enter Post Tags"
                    allowDuplicate={false}
                    max={4}
                    value={tags}
                    onChange={(e) => {
                      const allData = e?.value;
                      if (allData && allData?.length >= 1) {
                        let lastItem = allData[allData.length - 1];
                        lastItem! = lastItem?.includes("#")
                          ? `${lastItem!}`
                          : `#${lastItem!}`;
                        allData[allData.length - 1] = lastItem;
                      }
                      setTags(allData!);
                    }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="">Post Body *</label>
                  <Editor value={body} onChange={setBody} />
                </div>
                <div className="edit-button-wrap">
                  <Button
                    type="button"
                    title="Cancel"
                    className="button"
                    onclick={handleClear}
                  />
                  <Button
                    type="button"
                    title="Update"
                    className="btn"
                    onclick={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-center">No Post Found</h2>
      )}
    </>
  );
};

export default EditPost;
