"use server";
import FeedbackIndex from "./_components";
import { feedbackColumns } from "./_components/colunm";
import { getAllFeedbacks } from "@/apis/feedback"; // Adjust the path as necessary

export default async function FeedbacksPage(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    limit: props.searchParams.limit ? +props.searchParams.limit : 10,
  };

  const response = await getAllFeedbacks(params);
  return (
    <div className="flex h-full flex-1 flex-col">
      <FeedbackIndex
        columns={feedbackColumns}
        payload={response.payload}
        params={params}
      />
    </div>
  );
}
