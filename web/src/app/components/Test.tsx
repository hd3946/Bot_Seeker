import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const Test = ({ data }: InferGetServerSidePropsType<GetServerSideProps>) => {
  return (
    <div>
      <h1>data</h1>
      <h1>{data}</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    "https://scan.oasys.games/api?module=account&action=txlist&address=0x29054BcD4d671E29e2Dc9133997F22E502732782"
  );
  const data = await response.json();
  console.log("data", data);
  return { props: { data } };
};

export default Test;
