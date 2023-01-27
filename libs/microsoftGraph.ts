import { getAuthenticatedClient } from "./microsoftAuth";

export async function sendEmail(provider: any, data: any): Promise<any> {
  if (!provider) {
    throw new Error("no provider");
  }
  const client = await getAuthenticatedClient(provider.accountId);

  const mail = {
    importance: "Low",
    subject: data?.subject,
    toRecipients: data?.to.map((t) => {
      return {
        emailAddress: { address: t },
      };
    }),
    bccRecipients: (data?.bcc || []).map((t) => {
      return {
        emailAddress: { address: t },
      };
    }),
    ccRecipients: (data?.cc || []).map((t) => {
      return {
        emailAddress: { address: t },
      };
    }),
    body: {
      content: data?.body,
      contentType: "html",
    },
    attachments: data?.attachements,
  };

  const message = await client
    .api("/me/messages")
    .header("Prefer", "IdType='ImmutableId'")
    .post(mail);

  await client.api(`/me/messages/${message.id}/send`).post({});

  return message;
}

export async function createEventMeeting(provider: any, data: any): Promise<any> {
  if (!provider) {
    throw new Error("no provider");
  }
  const client = await getAuthenticatedClient(provider.accountId);

  const eventBody = {
    start: data.start,
    end: data.end,
    recurrence: data.recurrence,
    attendees: (data?.attendees || []).map((t) => {
      return {
        emailAddress: { address: t },
      };
    }),
    allowNewTimeProposals: true,
    isOnlineMeeting: data.isOnlineMeeting,
    onlineMeetingProvider: "teamsForBusiness",
  };

  const event = await client
    .api("/me/events")
    .header("Prefer", "IdType='ImmutableId'")
    .post(eventBody);

  let message = await client
    .api(
      `/users/${provider.username}/messages?$expand=microsoft.graph.eventMessage/event($filter=id eq '${event.id}')`
    )
    .header("Prefer", "IdType='ImmutableId'")
    .get();

  const eventMessage = message.value.find((e) => e.event.id === event.id);

  return { remoteId: event.id, replyId: eventMessage.id };
}

export async function updateEventMeeting(provider: any, eventId: string, data: any): Promise<any> {
  if (!provider) {
    throw new Error("no provider");
  }
  const client = await getAuthenticatedClient(provider.accountId);

  const event = {
    subject: data.subject,
    body: {
      contentType: "HTML",
      content: data.body,
    },
    start: {
      dateTime: data.start,
      timeZone: data.timezone,
    },
    end: {
      dateTime: data.end,
      timeZone: data.timezone,
    },
    attendees: (data?.attendees || []).map((t) => {
      return {
        emailAddress: { address: t },
      };
    }),
    location: data.location,
    allowNewTimeProposals: true,
    isOnlineMeeting: data.isOnlineMeeting,
    onlineMeetingProvider: "teamsForBusiness",
  };

  return client.api(`/me/events/${eventId}`).patch(event);
}

//TODO verify that the event is cancelled before updating the model (getEvent => event.isCanceled)
export async function cancelEventMeeting(
  provider: any,
  eventId: string,
  comment: string
): Promise<any> {
  if (!provider) {
    throw new Error("no provider");
  }
  const client = await getAuthenticatedClient(provider.accountId);

  const cancel = {
    ...(comment && {
      Comment: comment,
    }),
  };

  return client.api(`/me/events/${eventId}/cancel`).post(cancel);
}
