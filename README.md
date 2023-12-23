# Blockchain-Project
Sau khi clone về: 
+ Vào test-network để khởi chạy một network
    - Đầu tiền chạy lệnh ./network.sh down để xóa các volume cũng như container của docker đang chứa cái gì
    - Chạy lệnh ./network.sh up createChannel -c mychannel -ca để khởi chạy network và tạo một channel tên mychannel
    - Chạy các lệnh
        export PATH=${PWD}/../bin:$PATh
        export FABRIC_CFG_PATH=$PWD/../config/
    Để cài đặt đường dẫn cho các tool cần thiết
    - Tiếp đến chạy lệnh ./network.sh deployCC -ccn basic -ccp ../student-chaincode/ -ccl javascript để install chaincode vào trong channel
+ Vào application-javascript để bắt đầu khởi chạy application
    - Đầu tiên vào server/utils và chạy lệnh node accessNetwork.js để đầu tiên để đăng ký một admin và userAdmin vào ví để cấp quyền truy cập và khởi tạo một số data vào ledger để demo (Chưa thực hiện được chức năng đăng nhập đăng ký nên tạm thời làm như này)
    - Kế đến quay lại folder application và vào các folder client và server để npm install các node_modules cần thiết
    - Chạy lệnh npm run dev để dự án lên


Tạm thời vẫn chưa có database với api để thử nên xem đường dẫn trong route client để xem các trang nha
