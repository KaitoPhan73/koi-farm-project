"use server";
import { httpBag } from "@/lib/http";
import {
  TFeedbackRequest,
  TFeedbackResponse,
  TUpdateFeedbackRequest,
} from "@/schema/feedback.schema"; // Update the path as necessary
import { TTableResponse } from "@/types/Table";

// Get all Feedbacks
const getAllFeedbacks = async (params?: any) => {
  return await httpBag.get<TTableResponse<TFeedbackResponse>>(`/feedbacks`, {
    params,
  });
};

// Get Feedback by ID
const getFeedbackById = async (id: string) => {
  return await httpBag.get<TFeedbackResponse>(`/feedbacks/${id}`);
};

// Create Feedback
const createFeedback = async (body: TFeedbackRequest) => {
  const result = await httpBag.post<TFeedbackResponse>("/feedbacks", body);
  return result;
};

// Update Feedback
const updateFeedback = async (id: string, body: TUpdateFeedbackRequest) => {
  const response = await httpBag.patch<TFeedbackResponse>(
    `/feedbacks/${id}`,
    body
  );
  return response;
};

// Delete Feedback
const deleteFeedback = async (id: string): Promise<void> => {
  await httpBag.delete(`/feedbacks/${id}`);
};

export {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
