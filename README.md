# Blockchain-Project
Sau khi clone về: 
*Để có thể cài đặt và khởi chạy chương trình, ta sẽ tiến hành các bước như sau:
- Bước tiền cài đặt là khởi động máy hệ điều hành ubuntu lên, sau đó tại terminal của máy, ta kiểm tra xem đã cài đặt nvm hay chưa. Khi đã cài đặt nvm rồi thì sử dụng lệnh nvm ls để kiểm tra đã cài đặt nodejs và npm chưa. Nếu cả 3 thứ trên đều chưa có cài đặt thì ta sẽ tiến hành cài đặt nvm và cài đặt nodejs và npm bằng nvm để có thể chạy được chương trình và không bị lỗi. Nếu máy ubuntu đã cài đặt nodejs và npm thông qua nvm thì có thể bỏ qua bước tiền cài đặt này.
Đầu tiên để cài đặt cài đặt nvm, ta sẽ tiến hành việc sử dụng lệnh “sudo apt-get install curl” để cài đặt cURL – một ứng dụng để  có thể cài các ứng dụng cần thiết trên mạng thông qua các dòng lệnh trong terminal.
Tiếp đến, ta sẽ tiến hành chạy lệnh “curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash” để cài đặt nvm.

Sau khi đã chạy lệnh và thấy cài đặt xong, ta sẽ tiến hành việc xác minh cài đặt bằng lệnh “command -v nvm” và kết quả quả mong đợi là “nvm”, nếu kết quả nhận lại được là “command not found” hoặc không có phản hồi kết quả thì hãy tắt đi và mở lại terminal và thử lại lênh xác minh một lần nữa.
Tiếp đến, ta sẽ chạy hai lệnh “nvm install --lts” và “npm install node” để cài đặt các gói cần thiết của nodejs. Sau khi đã chạy lệnh và thấy cài đặt thành công, ta sẽ sử dụng lệnh nvm ls để kiểm tra cài đặt. Sau khi đã kiểm tra và thấy cài đặt thành công. Ta sẽ tiến hành việc cài đặt và khởi chạy chương trình.

Bước 1: Ta tiến hành vào thư mục chứa source code của chương trình và cài đặt các node_modules tại thư mục cần thiết:
-	Đầu tiên, ta sẽ vào thư mục có tên là “application-javascript” là thư mục chứa phần mềm của chương trình và được đánh dấu thực hiện bằng ngôn ngữ javascript. Tại đây ta chạy lênh “npm install” để có thể cài đặt node_modules cho thư mục này. Sau đó kiểm tra đã tồn tại thư mục node_module ở thư mục này chưa để tiến hành bước tiếp theo
-	Tiếp đến, ta sẽ vào thư mục có tên là “client” là thư mục chứa các giao diện hệ thống cho người dùng tương tác. Tại thư mục này ta cũng sẽ tiến hành chạy lệnh “npm install” để có thể cài node_modules cho thư mục này.
-	Sau khi cài đặt tại thư mục này, ta sẽ tiến hành quay lại thư mục “application-javascript” và vào thư mục “server” là thư mục lưu trữ phần backend của hệ thống. Tại thư mục này ta cũng tiến hành chạy lênh “npm install’ để cài đặt node_modules cho thư mục này.
-	Sau khi cài đặt xong tất cả các node_modules ở các thư mục cần thiết. Ta sẽ quay lại thư mục chứa source code và vào thư mục tên là “test-network” để tiếp tục bước 2.

Bước 2: Tại thư mục “test-network” này chứa các thông tin cũng như các cài đặt cần thiết cho việc khởi chạy một mạng Hyperledger fabric cơ bản để có thể lưu trữ các thông tin cũng như các chaincode phục vụ cho việc là cơ sở dữ liệu.
-	Tại thư mục này, các câu lệnh để khởi chạy network đã được gói gọn vào trong file network.sh để tiện cho việc khởi chạy network hơn.
-	Đầu tiên sau khi vào thư mục, ta sẽ tiến hành chạy lệnh “./network.sh down” để ngắt kết nối network. Mục đích của việc này là xóa sạch các peer chaincode để chạy một network mới. Sau khi chạy lệnh ta kiểm tra luôn trong docker xem đã xóa hết mọi thứ chưa.
-	Tiếp đến ta sẽ chạy lệnh ./network.sh up createChannel -c mychannel -ca” để khởi chạy một mạng network mới phục vụ cho việc demo chương trình và đồng thời thêm một channel với tên gọi là “mychannel” . Ta kiểm tra trong docker xem rằng các peer đã tồn tại trong network chưa.
-	Tiếp đến, ta sẽ thực hiện việc chạy lệnh “./network.sh deployCC -ccn basic -ccp ../student-chaincode/ -ccl javascript” để thực hiện việc gói lại các smart contract trong ở trong thư mục “student-chaincode” với tên là “basic” và deploy vào trong channel vừa mới tạo.
-	Sau khi đã commit chaincode vào channel thành công thì sẽ có thông báo. Ta sẽ tiến hành bước tiếp theo để định nghĩa những data cơ bản cũng như một admin được cấp quyền vào ví để có thể tương tác với ví trong network.

Bước 3: Sau khi đã cài đặt và khởi chạy được network cũng như cài đặt được các thứ cần thiết vào trong network. Giờ đây ta sẽ tiến hành khởi chạy chương trình.
-	Đầu tiên, ta sẽ vào thư mục “application-javascript” và chạy lệnh “npm run init”. Lệnh này sẽ giúp ta vào trong thư mục “server” và thư mục “utils” để chạy file “accessNetwork.js”. File này sẽ giúp chúng ta khỏi tạo ví và thêm một admin và một user vào ví để có quyền truy cập vào ví và khởi tạo một số data vào ví để có thể phục vụ cho việc demo chương trình.
-	Tiếp đó, ta sẽ chạy lệnh “npm run dev” để tiến hành khởi động cùng lúc client và server. Khi chạy lệnh này thì chương trình sẽ bắt đầu khởi động ở “localhost:3000”. Vậy là ta đã cài đặt và khởi chạy chương trình thành công.
