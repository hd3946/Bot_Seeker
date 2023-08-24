$(function () {
  // 데이터를 테이블에 추가하는 함수
  function populateTable(data) {
    const tbody = document.querySelector("tbody");

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <th>${item.id}</th>
        <td>${item.walletAddress}</td>
        <td>${item.firstName}</td>
        <td>${item.lastName}</td>
        <td class="amount-${item.id}">${item.amount.toFixed(6)} ${
        item.currency
      }</td>
      `;
      tbody.appendChild(row);
    });
  }
  $(document).ready(function () {
    var url2 =
      "https://scan.oasys.games/api?module=account&action=txlist&address=0x29054BcD4d671E29e2Dc9133997F22E502732782";
    // var url = "https://www.fruityvice.com/api/fruit/all";
    var url = "http://localhost:4000/tokenBalance";

    const data = [
      {
        id: 1,
        walletAddress: "xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx",
        firstName: "Mark",
        lastName: "Otto",
        amount: 0.013535,
        currency: "XPLA",
      },
      {
        id: 2,
        walletAddress: "xpla1vjsukqzxq7u8hjgrkz24u2asxyfddsx2s9cm5x",
        firstName: "Mark",
        lastName: "Otto",
        amount: 0.013535,
        currency: "XPLA",
      },
      {
        id: 3,
        walletAddress: "xpla1vk7v6qvmxflnhggs6q2jzf8vhjyeansv579t2n",
        firstName: "Mark",
        lastName: "Otto",
        amount: 0.013535,
        currency: "XPLA",
      },
      {
        id: 4,
        walletAddress: "xpla10fwn393zee43n2974ct9yz3nfq9qf0p3mdxjmp",
        firstName: "Mark",
        lastName: "Otto",
        amount: 0.013535,
        currency: "XPLA",
      },
      {
        id: 5,
        walletAddress: "xpla1cc4cw53vp82slkvn7kku9xd4zjlykptehtzwzx",
        firstName: "Mark",
        lastName: "Otto",
        amount: 0.013535,
        currency: "XPLA",
      },
    ];

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("data", result);
        for (let i = 0; i < result.length; i++) {
          data[i].amount = result[i];
        }
        populateTable(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
