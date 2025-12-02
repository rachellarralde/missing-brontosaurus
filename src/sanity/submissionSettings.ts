import { defineQuery } from "next-sanity";
import { sanityFetch } from "./live";

const kSubmissionSettingsSlug = "default";

export const SUBMISSION_BACKEND_QUERY = defineQuery(`*[
    _type == "submissionSettings"
    && slug.current == "${kSubmissionSettingsSlug}"
  ]{
    _id, enabled, formUrl
  }`);


interface SubimssionSettingsBase {
  enabled: boolean;
}

interface SubmissionSettingsBackendResult extends SubimssionSettingsBase {
  formUrl: string;
}

interface SubmissionSettingsFrontendResult extends SubimssionSettingsBase {
  activeMessage: string;
  awayMessage: string;
}

const isResponseValid = <T>(data: T[] | undefined): data is T[] => {
  return data !== undefined && data.length > 0 && data[0] !== undefined && (data[0] as SubimssionSettingsBase).enabled !== undefined;
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
