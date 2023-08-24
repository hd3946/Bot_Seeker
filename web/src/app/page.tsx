import Test from "./components/test";

async function getData() {
  const response = await fetch(
    "https://scan.oasys.games/api?module=account&action=txlist&address=0x29054BcD4d671E29e2Dc9133997F22E502732782"
  );
  const data = await response.json();
  return data;
}

export default async function Home() {
  const data = await getData();
  console.log("data", data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>hi</h1>
        {data.result.map((item: any) => {
          return (
            <div>
              <h1>{item.hash}</h1>
            </div>
          );
        })}
      </div>
    </main>
  );
}
