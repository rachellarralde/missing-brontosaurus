import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

export const SUBMISSION_BACKEND_QUERY = defineQuery(`*[
    _type == "submissionSettings"
    && slug.current == "default"
  ]{
    _id, enabled, formUrl
  }`);

interface SubmissionSettingsBackendResult {
    enabled: boolean;
    formUrl: string;
}

export const fetchSubmissionSettingsForBackend = async (): Promise<SubmissionSettingsBackendResult> => {
    const { data } = await sanityFetch({ query: SUBMISSION_BACKEND_QUERY });
    return data[0] as SubmissionSettingsBackendResult;
}

export const SUBMISSION_FRONTEND_QUERY = defineQuery(`*[
    _type == "submissionSettings"
    && slug.current == "default"
  ]{
    _id, enabled, activeMessage, awayMessage
  }`);

interface SubmissionSettingsFrontendResult {
    enabled: boolean;
    activeMessage: string;
    awayMessage: string;
}

export const fetchSubmissionSettingsForFrontend = async (): Promise<SubmissionSettingsFrontendResult> => {
    const { data } = await sanityFetch({ query: SUBMISSION_FRONTEND_QUERY });
    return data[0] as SubmissionSettingsFrontendResult;
}
