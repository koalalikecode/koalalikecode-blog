---
title: "Giới thiệu về Async/Await trong JavaScript"
description: "Khi nhắc đến xử lý bất đồng bộ trong JavaScript, chắc ai cũng liên tưởng đến một vấn đề của việc sử dụng callback function, đó là **callback hell**, đại khái trông nó sẽ như [thế này](https://images.viblo.asia/2b67c194-4ef8-4879-a44b-410c1b4bddee.png). Qua thời gian, callback bộc lộ nhiều yếu điểm, thời gian hoàn tất tăng lên do các hàm phải \"xếp hàng\" để chờ nhau thực hiện, cấu trúc code trở nên khá rối và khó bảo trì."
slug: "Gioi-thieu-ve-AsyncAwait-trong-JavaScript"
pubDate: 2023-01-12T08:01:18.051Z
updatedDate: 2023-01-12T08:01:18.051Z
heroImage: "../../assets/blog/Gioi-thieu-ve-AsyncAwait-trong-JavaScript-hero.png"
tags: ["javaScript"]
categories: ["code"]
legacyId: "63bfbe4ebda80370e9926db7"
---

Khi nhắc đến xử lý bất đồng bộ trong JavaScript, chắc ai cũng liên tưởng đến một vấn đề của việc sử dụng callback function, đó là **callback hell**, đại khái trông nó sẽ như [thế này](https://images.viblo.asia/2b67c194-4ef8-4879-a44b-410c1b4bddee.png). Qua thời gian, callback bộc lộ nhiều yếu điểm, thời gian hoàn tất tăng lên do các hàm phải "xếp hàng" để chờ nhau thực hiện, cấu trúc code trở nên khá rối và khó bảo trì.

May mắn thay, trong phiên bản ES6, JavaScript mang đến cho người dùng khái niệm **Promise**. Việc viết code bất đồng bộ với cấu trúc Promise và .then() trở nên rất rõ ràng và tường minh, vì vậy cộng đồng nhanh chóng chuyển sang sử dụng Promise thay thế callbacks.

Và ở phiên bản ES7, với sự xuất hiện của **Aync/Await**, viết JavaScript bất đồng bộ còn trở nên dễ dàng và tốt hơn nữa.

## Async/Await là gì?

**Async/Await** là một cách mới để viết code bất đồng bộ, được **Javascript** giới thiệu từ bản cập nhật **ES7**. Nó được xây dựng trên **Promise** và tương thích với tất cả **Promise** dựa trên API. Trong đó được cấu tạo từ 2 thành phần: **async function** và **await**.

### 1. Async functions

Với từ khóa async, chúng ta có thể khai báo hàm bất đồng bộ. Các hàm này có giá trị trả về là một Promise. Mình sẽ minh họa về async với ví dụ sau:

```javascript
async function gdscHust() {
  return "Welcome to GDSC-HUST!"
  //tương đương với return new Promise(resolve => resolve("Welcome to GDSC-HUST!"))
}

gdscHust().then(
    res => console.log(res)
    //in ra Welcome to GDSC-HUST!
)
```

Trong ví dụ trên chúng ta có thể thấy `async` được đặt trước một hàm thông thường để biến thành một hàm bất đồng bộ, giá trị trả về là một Promise nên chúng ta hoàn toàn có thể gọi hàm và xử lý Promise với `.then()` để lấy ra kết quả.

### 2. Await

**Await** sẽ tạm dừng việc thực hiện các hàm async

- Khi đặt trước một Promise, await sẽ khiến các đoạn code còn lại đợi đến khi Promise kết thúc và trả về kết quả.
- Await chỉ làm việc với Promises, nó không hoạt động với callbacks.
- Cho đến phiên bản ES2021, await chỉ được sử dụng bên trong các hàm async. Ở phiên bản ES2022, JavaScript đã mang đến người dùng khái niệm ***top-level async/await*** giúp sử dụng await một cách linh hoạt hơn.

Đễ dễ hình dung, trước khi có async/await chúng ta sẽ xử lý các đoạn code bất đồng bộ với Promises, bây giờ chúng ta sẽ xử lý các đoạn code đó trong hàm async. Sau đây, mình sẽ ví dụ về việc lấy dữ liệu với 2 cách khác nhau: cách thứ 1 với Promises, và cách thứ 2 với Async / Await.

```javascript
// cách 1:
function getJSON() {
  // To make the function blocking we manually create a Promise.
  return new Promise(function (resolve) {
    fetch("https://dummyjson.com/products").then(function (res) {
      // The data from the request is available in a .then block
      // We return the result using resolve.
      resolve(res.json());
    });
  });
}
// cách 2:
// Async/Await approach

// The async keyword will automatically create a new Promise and return it.
async function getJSONAsync() {
  // The await keyword saves us from having to write a .then() block.
  let res = await fetch("https://dummyjson.com/products");

  // The result of fetch request is available in the res variable.
  // We return it just like in a regular synchronous function.
  return res.json();
}
```

Hai hàm trên đều thực hiện fetch dữ liệu với api https://dummyjson.com/products, sau đó trả về một Promise với dữ liệu đã được xử lý. Tuy nhiên, chúng ta có thể thấy cách tiếp cận với Async/Await ngắn hơn và dễ đọc hơn.

Vì giá trị trả về là một Promise nên chúng ta có thể xử lý tiếp như sau:

```javascript
getJSONAsync().then( function(result) {
	// Do something with result.
});
```

## Xử lý lỗi trong Async/Await

Khi xử lý bất đồng bộ, đôi lúc chúng ta sẽ gặp các lỗi không mong muốn, Async/Await cho phép chúng ta sử dụng câu lệnh try/catch để bắt các lỗi. Chúng ta chỉ cần để các await call của chúng ta vào trong khối try/catch, mệnh đề catch sẽ xử lý các lỗi có thể xảy ra bên trong mệnh đề try:

```javascript
async function doSomethingAsync(){
	try {
		// This async call may fail.
		let result = await someAsyncCall();
	}
	catch(error) {
		// If it does we will catch the error here.
	}  
}
```

Trong một vài trường hơp, chúng ta có thể bắt các lỗi khi đang chạy async function. Bởi vì hàm async trả về một Promise, chúng ta chỉ cần thêm `.catch()` để xử lý sau khi gọi hàm.

```javascript
// Async function without a try/catch block.
async function doSomethingAsync(){
    // This async call may fail.
    let result = await someAsyncCall();
    return result;  
}

// We catch the error upon calling the function.
doSomethingAsync().
    .then(successHandler)
    .catch(errorHandler);
```

Bạn nên quen thuộc với một trong hai cách xử lý lỗi và tuân theo nó. Đôi khi sử dụng cả `try/catch` và `.catch()` sẽ dẫn đến những lỗi không mong muốn.

## Tạm kết

Chúng ta vừa đi qua một số khái niệm cơ bản về Async/Await trong JavaScript. Async/Await giúp cho việc xử lý bất đồng bộ trong Js trở nên dễ dàng và ít gặp lỗi hơn. Cảm ơn các bạn đã đọc bài viết, hẹn gặp các bạn ở những bài viết tiếp theo.
