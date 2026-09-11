---
title: "Giới thiệu các thẻ cơ bản trong HTML"
description: "Chỉ với một số thẻ HTML thông dụng, bạn đã hoàn toàn có thể tạo riêng cho mình một trang web đơn giản."
slug: "Gioi-thieu-cac-the-co-ban-trong-HTML"
pubDate: 2022-08-22T03:01:30.839Z
updatedDate: 2022-08-22T03:01:30.839Z
heroImage: "./Gioi-thieu-cac-the-co-ban-trong-HTML-hero.png"
tags: ["html", "frontend"]
categories: ["code"]
legacyId: "6302f18a6d7c2c965ee16e47"
---

## Giới thiệu

Xin chào các bạn, ngày nay HTML hay Hypertext Markup Language đã trở thành một ngôn ngữ phổ biến và rộng rãi hơn với tất cả mọi người. Nếu các bạn muốn tìm hiểu về lập trình web, việc biết đến HTML là điều cần phải có, bởi vì dù trang web có đơn giản hay phức tạp thì đều có phần HTML làm khung xương, khung xương vững chắc thì những thành phần khác mới xây lên một cách dễ dàng được. Vậy thì hôm nay mình sẽ cùng các bạn tìm hiểu về một số thẻ cơ bản và thông dụng nhất trong HTML nhé.

## Phân loại thẻ trong HTML

### Phân loại theo cấu trúc

Ở trong HTML, các bạn sẽ dễ dàng nhận ra được cấu trúc khác nhau cơ bản của 2 loại thẻ chính: thẻ có thẻ mở và thẻ đóng, và thẻ tự đóng.

```html
<p>Welcome to GDSC-HUST</p>
```

Ở trên mình có thẻ p với `<p>` là thẻ mở sau đó đến nội dung là `Welcome to GDSC-HUST` rồi đến thẻ đóng là `</p>`, các bạn thấy thẻ đóng nó giống thẻ mở nhưng có dấu `/` phía trước nhé. Ngoài ra các bạn sẽ thường gặp những thẻ tự đóng có cấu trúc như sau:

```html
<img src="" alt=""/>
```

Những thẻ có cấu trúc như trên gọi là thẻ tự đóng nghĩa là chúng ta không thể truyền nội dung vào giữa như thẻ đóng mở ở chỗ thẻ p mình nói ở trên. Các bạn cần lưu ý những thẻ nào là thẻ có thẻ mở và thẻ đóng và những thẻ nào tự đóng để code chuẩn hơn và tránh gặp lỗi nhé.

### Phân loại theo tính chất

Khi làm quen với HTML, chúng ta có thể thấy được có những thẻ có tính chất, đặc điểm, hành vi trên web khác với thẻ khác, vì vậy dựa trên điều này chúng ta có 2 loại thẻ chính là: **thẻ block** và **thẻ inline**.

Thẻ inline và thẻ block có những điểm khác nhau chính mà các bạn cần lưu ý

- Thẻ inline sẽ bị hạn chế về CSS như margin-top margin-bottom, padding-top, padding-bottom… khi sử dụng thẻ inline thì nên biết mà tuỳ trường hợp mà sử dụng, có thể dùng CSS để biến thẻ inline thành block hoặc inline block
- Khi các thẻ inline nằm cùng nhau thì nó sẽ nằm trên một hàng như tên gọi của nó là inline
- Thẻ inline sẽ có độ rộng bằng nội dung mà nó chứa
- Thẻ block sẽ có độ rộng full 100% phần tử cha chứa nó
- Thẻ block không bị hạn chế về CSS
- Vì thẻ block full 100% phần tử cha chứa nó cho nên khi dùng thẻ block cùng với nhau thì các phần tử đó sẽ rớt xuống hàng
- Thẻ inline và thẻ block có thể sử dụng cùng với nhau, điển hình là thẻ a nằm trong thẻ p khi các bạn đọc bài viết có gắn link vào để các bạn nhấn vô được

```html
<p>You can<a href="google.com">click here</a></p>
```

- Khi sử dụng CSS biến thẻ thành inline-block thì nó là sự kết hợp giữa thẻ inline và thẻ block, tức là nó sẽ có độ rộng theo nội dung nó chứa mà thôi(đặc điểm của thẻ inline), và không bị hạn chế về CSS(đặc điểm của thẻ block), nằm gần nhau thì nằm trên 1 hàng(đặc điểm của thẻ inline)

## Các thẻ HTML hay dùng nhất

### Thẻ div

Là **thẻ block** và là thẻ được sử dụng rộng rãi nhất hiện nay. Thẻ div thường được dùng cho một khối nào đó lớn, bên trong khối đó có thể có nhiều khối nhỏ(cũng là thẻ div) hoặc các thẻ p, và nhiều thẻ khác, chính vì vậy, thẻ div là viết tắt của division tức là sự phân chia các mục. Có thể nói thẻ div là thẻ chung nhất và có thể đảm nhận nhiều chức năng của các thẻ khác, khi chưa có những thẻ đặc biệt tạo bố cục trang web, thì thẻ div sẽ được dùng để thay cho các thẻ đó. Ngoài ra, thẻ div cũng có thể chứa văn bản tương tự với thẻ văn bản(thẻ p), tuy nhiên chúng ta nên dùng thẻ p như sẽ được giới thiệu tiếp theo đây.

```html
<div class = "container">
    <div class = "inside-container">
        <div>This is div tag</div>
    </div>
</div>
```

### Thẻ văn bản

Thẻ văn bản hay trong html là thẻ p, là **thẻ block** đặc trưng cho văn bản(paragraph) và theo mình cũng là thẻ cơ bản nhất trong html. Thẻ p có các thuộc tính hay dùng là class và id, nội dung thẻ p là các đoạn văn bản bất kì. Trên các trang web, các bạn có thể thấy rằng hầu hết các đoạn văn bản đều được chứa trong các thẻ p. Vì vậy, khi muốn viết một đoạn văn bản trên web, các bạn hãy ưu tiên bọc nó bằng thẻ p nhé.

```html
<p>Đây là một đoạn văn bản bất kì</p>
```

### Các thẻ tiêu đề

Các thẻ tiêu đề là những thẻ `h1,h2,h3,h4,h5,h6` là **thẻ block** và thường đại diện cho các tiêu đề từ to cho đến nhỏ và có cách sử dụng khác nhau (h1 là to nhất tới h6 là nhỏ nhất). Thẻ **h1** là thẻ thường được sử dụng cho một tiêu đề to nhất của trang web và lưu ý trong một trang web thì chỉ có **tối đa một thẻ h1** mà thôi, vì nó ảnh hưởng tới SEO cho nên nếu các bạn sử dụng nhiều hơn một thẻ h1 thì không tốt đâu nhé.

```html
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<h3>This is heading 3</h3>
```

Như tên gọi của nó thì nó được dùng cho cấu trúc có tiêu đề ví dụ như tiêu đề khối, tiêu đề bài viết, tiêu đề blog. Bên trong nó có thể chứa thẻ a, hoặc các thẻ inline khác, hay thẻ block… Và các bạn lưu ý các đoạn văn bản dài như ở thẻ p thì nên dùng thẻ p hoặc thẻ div chẳng hạn chứ đừng dùng những thẻ tiêu đề này cho một đoạn văn bản quá dài nhé.

### Thẻ liên kết

Thẻ a là **thẻ inline**, dùng cho các liên kết, bạn có thể dùng thẻ này để liên kết đến các trang web khác hoặc liên kết đến các mục khác trong chính trang web hiện tại với điều kiện mục đó **phải có id** và trong **thuộc tính href** của thẻ a phải bắt đầu bằng **dấu #** 

```html
<a href = "link">Đây là liên kết đến trang web khác</a>
<a href = "#main">Liên kết đến nội dung chính trong trang này</a>
<div id = "main">Đây là nội dung chính</div>
```

Trong thẻ a có 2 thuộc tính quan trọng đó chính là `href và target`, **href** sẽ truyền vào đường dẫn, hoặc **id** mục khác sau dấu #, **target** thì có 2 giá trị thường được sử dụng nhất là `_self` và `_blank`, **_self** thì nó sẽ mở trong tab hiện tại luôn(dễ hiểu hơn nó sẽ thay thế tab hiện tại trên trình duyệt bằng link các bạn nhấn vào), còn **_blank** nó sẽ mở ra một tab mới trên trình duyệt. Nội dung của thẻ a sẽ là văn bản hiện ra trực tiếp với người dùng mà khi bấm vào sẽ dẫn tới đường link trong thuộc tính **href**, vì vậy các bạn nên đặt nội dung thẻ a tường minh, rõ ý nhé.

```html
<a href="https://google.com" target = "_blank">google.com</a>
```

Bên trong thẻ a có thể chứa nhiều thẻ khác luôn nhé như thẻ block khác, thẻ inline… Sau này các bạn code giao diện mà có cho người dùng nhấn vào một khối nào đó thì chắc chắn các bạn sẽ dùng thẻ a bao lại hết chúng.

### Thẻ img

Là **thẻ inline** và là **thẻ tự đóng** nên không truyền nội dung vào giữa như các thẻ đóng mở khác được. Thẻ này sử dụng rất nhiều trong trang web để hiển thị hình ảnh, thẻ img có 2 thuộc tính chính mà các bạn cần nắm đó là `src` và `alt` trong đó **src** truyền vào đường dẫn hình ảnh để hiển thị hình ảnh lên trang web, còn thẻ **alt** thì là liên quan tới SEO một chút, khi hình ảnh đường dẫn sai sẽ không hiển thị được thì nội dung trong thẻ alt sẽ hiển thị lên.

```html
<img src = "google_image.png" alt = "google_image">
```

Ngoài ra, như đã nói ở thẻ liên kết, bạn hoàn toàn có thể bọc thẻ img trong một thẻ a nếu muốn khi người dùng nhấp vào hình ảnh sẽ dẫn đến một trang khác.

### Thẻ danh sách

Thẻ danh sách thì có 2 thẻ chính với cấu trúc hay dùng là `ul li` và `ol li`. Trong đó **ul** nghĩa là **unorderedlist** nghĩa danh sách không có thứ tự, tức là khi dùng nó sẽ hiển thị dưới dạng như này với các chấm tròn mặc định hoặc vuông dựa vào CSS sẽ nói sau này.

- a
- b

Còn **ol** là **orderedlist** nghĩa là danh sách có thứ tự tức được đánh số như mục lục vậy 1 2

1. a
2. b

Thẻ danh sách được sử dụng nhiều để liệt kê các nội dung hoặc ở trường hợp để làm các mục của menu trang web

```html
<p>Things cats like:</p>
<ul class = "cat-hobbies">
    <li>Milk</li>
    <li>Fish</li>
    <li>Sleeping</li>
</ul>
```

### Các thẻ semantic

Với nhu cầu code web ngày càng phổ biến và rỗng rãi hơn, các thẻ semantic được tạo ra nhằm để giúp cho trang web có cấu trúc mạch lạc, khoa học hơn, nhất là những trang web về các bài báo hay các bài blog. Điều này là hoàn toàn hợp lý bởi vì lượng người dùng trang web càng ngày càng nhiều và chúng ta không chỉ sử dụng web trên các thiết bị nhìn mà còn có cả các thiết bị nghe. Chính vì vậy, cấu trúc web rõ ràng, mạch lạc các phần là điều rất quan trọng để các thiết bị này có thể phân biệt và truyền tải nội dung đến người dùng. Một số thẻ semantic có thể kể đến như: `thẻ header, thẻ footer, thẻ aside, thẻ article, thẻ main, thẻ section,...`

Chúng ta có thể nhận thấy rằng tên các thẻ semantic hiển thị rõ ý nghĩa và chức năng của từng thẻ. Trước khi có các thẻ này người ta thường dùng thẻ div kèm với id hay class để chia các thành phần trang bởi vì tính chất của các thẻ này là như nhau. Mặc dù vậy, các bạn mới làm quen với HTML nên học dùng các thẻ này luôn để có cái nhìn tổng quát về cấu trúc trang web.

![Sematic_tags](./Gioi-thieu-cac-the-co-ban-trong-HTML-1.jpg)

### Các thẻ định dạng văn bản

Là các thẻ inline, có chức năng làm nổi bật các đoạn chữ ngắn hoặc căn chỉnh các thành phần theo nhu cầu của người tạo web. Một số thẻ thường dùng như thẻ `strong` và thẻ `b` làm cho chữ **in đậm**, thẻ `em` và thẻ `i` để làm chữ *in nghiêng*, thẻ `br` để xuống dòng,...

```html
<p>
    <b>Dòng này được in đậm</b>
    <br> <!-- Xuống dòng --> 
    <em>Dòng này được in nghiêng</em>
</p>
```

## Tạm kết

Vậy là mình đã giới thiệu cho các bạn một số thẻ thông dụng trong HTML. Những thẻ này trông thì rất cơ bản và đơn giản nhưng lại đóng vai trò vô cùng quan trọng trong tất cả các trang web, với những thẻ này các bạn đã hoàn toàn có thể tạo riêng cho mình một trang web trình bày thông tin đơn giản rồi đấy. Cảm ơn các bạn đã đọc bài viết của mình và chúc các bạn học code vui vẻ!
