import pkg from "@apollo/client";
const { ApolloClient, InMemoryCache, gql } = pkg;

const client = new ApolloClient({
  uri: "https://api-quan-ly-dai-ly-nhom-22.herokuapp.com/",
  cache: new InMemoryCache(),
});

const tenDaiLy = [
  "Đại Lý Bình Đức",
  "Đại Lý Mỹ Hà",
  "Đại Lý An Việt",
  "Đại Lý Ngọc Minh",
  "Đại Lý Hà Long",
  "Đại Lý Hoàng Việt",
  "Đại Lý Long Thi",
  "Đại Lý Đại Long",
  "Đại Lý Kiều Phương",
  "Đại Lý Bình Nhàn",
  "Đại Lý Lệ Đình",
  "Đại Lý Đình Thắm",
  "Đại Lý Trúc Trung",
  "Đại Lý Tuấn Kiều",
  "Đại Lý Hương Lệ",
  "Đại Lý Sương Phương",
  "Đại Lý Minh Đình",
  "Đại Lý Hoàng Dũng",
  "Đại Lý Hà Hạnh",
  "Đại Lý Thảo Tuấn",
  "Đại Lý Thu Đình",
  "Đại Lý Đan Hòa",
  "Đại Lý Mỹ Thi",
  "Đại Lý Trung Phúc",
  "Đại Lý Hiếu Dũng",
  "Đại Lý Ngân Hồng",
  "Đại Lý Hiếu Vũ",
  "Đại Lý Phương Quang",
  "Đại Lý Ngọc Ngọc",
  "Đại Lý Tân Lệ",
  "Đại Lý Ngọc Trang",
  "Đại Lý Hương Trung",
  "Đại Lý Thủy Nhi",
  "Đại Lý Dung Linh",
  "Đại Lý Bình Tân",
  "Đại Lý Thành Dương",
  "Đại Lý Thành Hiếu",
  "Đại Lý Sơn Thắm",
  "Đại Lý Phương Ngọc",
  "Đại Lý Tuấn Thu",
  "Đại Lý Nhi Đình",
  "Đại Lý Hiếu Trúc",
  "Đại Lý Ngân Thắm",
  "Đại Lý Kiều Hòa",
  "Đại Lý Hiếu Hạnh",
  "Đại Lý Dương Phúc",
  "Đại Lý Ngân Diễm",
  "Đại Lý Đình Dung",
  "Đại Lý Nhi Sơn",
  "Đại Lý Tú Nhi",
  "Đại Lý Hà Tân",
  "Đại Lý Mỹ Hạnh",
];

const diaChi = [
  "Số 15, Đường Phạm Ngũ Lão",
  "Số 6, Đường Lê Duẩn",
  "Số 2, Đường Lý Tự Trọng",
  "Số 8, Đường Phạm Ngũ Lão",
  "Số 14, Đường Lý Tự Trọng",
  "Số 17, Đường Võ Văn Kiệt",
  "Số 2, Đường Điện Biên Phủ",
  "Số 1, Đường Trần Phú",
  "Số 9, Đường Nguyễn Thị Minh Khai",
  "Số 15, Đường Võ Văn Kiệt",
  "Số 5, Đường Hoàng Diệu",
  "Số 8, Đường Phan Đình Phùng",
  "Số 20, Đường Lê Duẩn",
  "Số 6, Đường Nguyễn Thị Minh Khai",
  "Số 13, Đường Lạc Long Quân",
  "Số 8, Đường Lạc Long Quân",
  "Số 1, Đường Điện Biên Phủ",
  "Số 7, Đường Hai Bà Trưng",
  "Số 10, Đường Hoàng Diệu",
  "Số 13, Đường Lý Thường Kiệt",
  "Số 14, Đường Lê Duẩn",
  "Số 3, Đường Võ Văn Kiệt",
  "Số 16, Đường Lý Thường Kiệt",
  "Số 14, Đường Trần Hưng Đạo",
  "Số 19, Đường Nguyễn Văn Trỗi",
  "Số 20, Đường Nguyễn Huệ",
  "Số 5, Đường Võ Văn Kiệt",
  "Số 19, Đường Nam Kỳ Khởi Nghĩa",
  "Số 2, Đường Nguyễn Thị Minh Khai",
  "Số 11, Đường Phạm Ngũ Lão",
  "Số 4, Đường Lý Thường Kiệt",
  "Số 2, Đường Nguyễn Văn Trỗi",
  "Số 18, Đường Nam Kỳ Khởi Nghĩa",
  "Số 19, Đường Trần Hưng Đạo",
  "Số 11, Đường Trần Phú",
  "Số 9, Đường Nguyễn Huệ",
  "Số 9, Đường Nguyễn Văn Trỗi",
  "Số 18, Đường Trần Phú",
  "Số 20, Đường Phạm Ngũ Lão",
  "Số 12, Đường Nam Kỳ Khởi Nghĩa",
  "Số 14, Đường Nguyễn Văn Trỗi",
  "Số 7, Đường Lý Thường Kiệt",
  "Số 15, Đường Nguyễn Văn Trỗi",
  "Số 2, Đường Hai Bà Trưng",
  "Số 17, Đường Điện Biên Phủ",
  "Số 4, Đường Trần Hưng Đạo",
  "Số 13, Đường Lê Lợi",
  "Số 14, Đường Hoàng Diệu",
  "Số 13, Đường Lê Duẩn",
  "Số 9, Đường Hai Bà Trưng",
  "Số 16, Đường Phạm Ngũ Lão",
  "Số 6, Đường Nguyễn Văn Trỗi",
];

const sdt = [
  "0452892065",
  "0842762662",
  "0511938736",
  "0612379407",
  "0279572813",
  "0924593340",
  "0018573859",
  "0745073780",
  "0604487955",
  "0405429525",
  "0410101033",
  "0867177178",
  "0702139663",
  "0416904639",
  "0816025066",
  "0153215420",
  "0104963935",
  "0139079815",
  "0384457183",
  "0213064841",
  "0016365749",
  "0851539040",
  "0892583230",
  "0233924211",
  "0918695259",
  "0879125733",
  "0994216041",
  "0687574740",
  "0966985532",
  "0843732622",
  "0871734625",
  "0203910006",
  "0538050970",
  "0266769114",
  "0081290332",
  "0903703837",
  "0392326277",
  "0675636101",
  "0591360190",
  "0872948798",
  "0066082110",
  "0583737716",
  "0829066519",
  "0714572814",
  "0178226764",
  "0705125533",
  "0971422391",
  "0950160945",
  "0413992886",
  "0580034791",
  "0394900118",
  "0479323928",
];

const maQuan = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "36",
  "37",
  "38",
  "39",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "36",
  "37",
  "38",
  "39",
];

// Hàm tạo dữ liệu ngẫu nhiên cho đối tượng
function generateData() {
  const data = [];

  for (let i = 0; i < 52; i++) {
    const daiLy = {
      tenDaiLy: tenDaiLy[i],
      dienThoai: sdt[i],
      diaChi: diaChi[i],
      maQuan: maQuan[i],
      maLoaiDaiLy: i % 2 == 0 ? "1" : "2",
      ngayTiepNhan: generateRandomDate(), // Ngày tiếp nhận ngẫu nhiên
    };

    // Thêm đại lý vào danh sách dữ liệu
    data.push(daiLy);
  }
  return data;
}

// Hàm tạo ngày tiếp nhận ngẫu nhiên
function generateRandomDate() {
  const start = new Date(2023, 0, 1); // Ngày bắt đầu: 1 tháng 1, 2023
  const end = new Date(2023, 12, 31); // Ngày kết thúc: 31 tháng 12, 2023
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  // Định dạng ngày tiếp nhận: "yyyy-mm-dd"
  const formattedDate = randomDate.toISOString().split("T")[0];

  return formattedDate;
}

// Gọi hàm tạo dữ liệu
const generatedData = generateData();

const addDaiLy = gql`
  mutation AddDaily(
    $tenDaiLy: String!
    $dienThoai: String!
    $diaChi: String!
    $maQuan: ID!
    $maLoaiDaiLy: ID!
    $ngayTiepNhan: String
  ) {
    addDaily(
      TenDaiLy: $tenDaiLy
      DienThoai: $dienThoai
      DiaChi: $diaChi
      MaQuan: $maQuan
      MaLoaiDaiLy: $maLoaiDaiLy
      NgayTiepNhan: $ngayTiepNhan
    ) {
      TenDaiLy
      relatedQuan {
        TenQuan
      }
      relatedLoaidaily {
        TenLoaiDaiLy
      }
    }
  }
`;

const func = async (client, generatedData) => {
  for (let i = 27; i < generatedData.length; i++){
    try {
        const res = await client.mutate({
            mutation: addDaiLy,
            variables: generatedData[i]
        });
        console.log(i, res.data.addDaily.TenDaiLy)
    }
    catch(err){
        console.log(i, err.message)
    }
  }
};

func(client, generatedData);
