/**
 * Creates a new meeting and returns the meeting ID
 * Use with Next.js router.push() for client-side navigation
 *
 * @example
 * const router = useRouter();
 * const meetingId = await createMeeting();
 * if (meetingId) router.push(`/dashboard/${meetingId}`);
 */
export const createMeeting = async (): Promise<string | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/meeting/createMeeting`,
      {
        method: "POST",
        credentials: "include", // Include cookies for JWT authentication
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to create meeting: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    if (!data.meetingId) {
      throw new Error("No meeting ID returned from server");
    }

    return data.meetingId;
  } catch (err) {
    console.error("Failed to create meeting:", err);
    return null;
  }
};
