import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

const kSubmissionSettingsSlug = "default";

export const SUBMISSION_BACKEND_QUERY = defineQuery(`*[
    _type == "submissionSettings"
    && slug.current == "${kSubmissionSettingsSlug}"
  ]{
    _id, enabled, formUrl
  }`);


const isResponseValid = (data: any) => {
  return data !== undefined && data.length > 0 && data[0].enabled !== undefined;
}

interface SubmissionSettingsBackendResult {
  enabled: boolean;
  formUrl: string;
}

export const fetchSubmissionSettingsForBackend = async (): Promise<SubmissionSettingsBackendResult> => {
  const { data } = await sanityFetch({ query: SUBMISSION_BACKEND_QUERY });
  if (!isResponseValid(data)) {
    return {
      enabled: false,
      formUrl: "",
    };
  }
  return data[0] as SubmissionSettingsBackendResult;
}

export const SUBMISSION_FRONTEND_QUERY = defineQuery(`*[
    _type == "submissionSettings"
    && slug.current == "${kSubmissionSettingsSlug}"
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
  if (!isResponseValid(data)) {
    return {
      enabled: false,
      activeMessage: "",
      awayMessage: "Submissions are currently unavailable.",
    }
  }
  return data[0] as SubmissionSettingsFrontendResult;
}
