import { FC, useState } from "react";
import { Button } from "components/Tailwind";
import axios from "axios";
import { useRouter } from "next/router";

const MicrosoftLoginView: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const connectToMicrosoftProvider = async () => {
    setLoading(true);

    try {
      const response = await axios.get<string>(`/api/auth/microsoft?uri=${router.asPath}`);
      const url = response.data;
      await router.push(url);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Button type="Default" loading={loading} onClick={() => connectToMicrosoftProvider()}>
      Log in with Outlook
    </Button>
  );
};

export default MicrosoftLoginView;
