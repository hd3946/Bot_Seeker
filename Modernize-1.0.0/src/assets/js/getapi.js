$(function () {
  // 데이터를 테이블에 추가하는 함수
  function populateTable(data, dataType) {
    const tbody_xpla = document.querySelector(".xpla");
    const tbody_token = document.querySelector(".token");

    if (dataType === "xpla") {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <th>${item.id}</th>
          <td style="color: red; width: 6rem">${item.walletAddress}</td>
          <td class="editable-cell" data-field="firstName">${
            item.firstName
          }</td>
          <td class="editable-cell" data-field="firstName">${item.lastName}</td>
          <td class="amount-${item.id}">${item.amount.toFixed(6)} ${
          item.currency
        }</td>
        `;
        row.querySelectorAll(".editable-cell").forEach((cell) => {
          cell.addEventListener("click", (event) => {
            const cell = event.target;
            const field = cell.getAttribute("data-field");

            if (field === "firstName") {
              const input = document.createElement("input");
              input.style.width = "5rem";
              input.value = cell.textContent;

              input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                  cell.textContent = input.value;
                  input.remove();
                }
              });

              cell.textContent = "";
              cell.appendChild(input);
              input.focus();
            }
          });
        });
        tbody_xpla.appendChild(row);
      });
    } else if (dataType === "token") {
      data.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <th>${item.id}</th>
          <td style="color: red; width: 6rem">${item.walletAddress}</td>
          <td>${item.firstName}</td>
          <td>${item.lastName}</td>
          <td class="amount-${item.id}">${item.amount.toFixed(6)} ${
          item.currency
        }</td>
        `;
        tbody_token.appendChild(row);
      });
    }
  }
  $(document).ready(function () {
    var url2 =
      "https://scan.oasys.games/api?module=account&action=txlist&address=0x29054BcD4d671E29e2Dc9133997F22E502732782";

    const data = [
      {
        id: 1,
        walletAddress: "xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx",
        firstName: "Company",
        lastName: "None",
        amount: 0,
        currency: "XPLA",
      },
      {
        id: 2,
        walletAddress: "xpla1vjsukqzxq7u8hjgrkz24u2asxyfddsx2s9cm5x",
        firstName: "Marketing",
        lastName: "None",
        amount: 0,
        currency: "XPLA",
      },
      {
        id: 3,
        walletAddress: "xpla1vk7v6qvmxflnhggs6q2jzf8vhjyeansv579t2n",
        firstName: "User",
        lastName: "None",
        amount: 0.013535,
        currency: "XPLA",
      },
      {
        id: 4,
        walletAddress: "xpla10fwn393zee43n2974ct9yz3nfq9qf0p3mdxjmp",
        firstName: "Team",
        lastName: "None",
        amount: 0.013535,
        currency: "XPLA",
      },
      {
        id: 5,
        walletAddress: "xpla1cc4cw53vp82slkvn7kku9xd4zjlykptehtzwzx",
        firstName: "Company",
        lastName: "None",
        amount: 0.013535,
        currency: "XPLA",
      },
    ];

    const data2 = [
      {
        id: 1,
        walletAddress: "xpla1cm53j8kyvrt6frxzarwxqz8rw4ls7shwgym2mx",
        firstName: "Company",
        lastName: "None",
        amount: 0,
        currency: "ELX",
      },
      {
        id: 2,
        walletAddress: "xpla1vjsukqzxq7u8hjgrkz24u2asxyfddsx2s9cm5x",
        firstName: "Marketing",
        lastName: "None",
        amount: 0,
        currency: "CTXT",
      },
      {
        id: 3,
        walletAddress: "xpla1vk7v6qvmxflnhggs6q2jzf8vhjyeansv579t2n",
        firstName: "User",
        lastName: "None",
        amount: 0,
        currency: "LCT",
      },
      {
        id: 4,
        walletAddress: "xpla10fwn393zee43n2974ct9yz3nfq9qf0p3mdxjmp",
        firstName: "Team",
        lastName: "None",
        amount: 0,
        currency: "CST",
      },
      {
        id: 5,
        walletAddress: "xpla1cc4cw53vp82slkvn7kku9xd4zjlykptehtzwzx",
        firstName: "Partner",
        lastName: "None",
        amount: 0,
        currency: "BST",
      },
    ];

    const balanceUrl = "http://localhost:4000/tokenBalance";
    const tokenUrl = "http://localhost:4000/tokenBalance2";
    fetchDataAndPopulateTable(balanceUrl, data, "xpla");
    fetchDataAndPopulateTable(tokenUrl, data2, "token");
  });
  async function fetchDataAndPopulateTable(url, dataArray, type) {
    try {
      const response = await fetch(url);
      const result = await response.json();

      console.log("data", result);

      const updatedDataArray = result.map((item, index) => {
        return { ...dataArray[index], amount: item };
      });

      populateTable(updatedDataArray, type);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
});
