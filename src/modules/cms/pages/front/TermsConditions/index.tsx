import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import StaticContent from '@/modules/cms/components/StaticContent';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { retrieveFromStorage } from '@/libs/utils/storage.util';
import { LanguageStoreContext } from '@/modules/lang/lang.store';

const TermsConditionsPage = () => {
  const languageStore = React.useContext(LanguageStoreContext);
  const lang =
    retrieveFromStorage('lang') ?? process.env.REACT_APP_DEFAULT_LANG;
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { MENU_TERM_CONDITIONS } = I18N;
  React.useEffect(() => {
    if (lang) {
      languageStore.setActiveLanguage(lang);
    }
  }, [languageStore.activeLanguage, lang, languageStore]);
  return (
    <>
      <WrapperTheme>
        <StaticContent title={t(MENU_TERM_CONDITIONS)} className="cms-terms">
          {lang === 'vi' ? (
            <>
              <h5 className="c6" id="h.8chzv62lnztz">
                <span className="c3">I. Giới thiệu chung</span>
              </h5>
              <h5 className="c6" id="h.qm5txmlmy48v">
                <span className="c13">1. Giới thiệu</span>
              </h5>
              <p className="c0">
                <span className="c7">
                  CÔNG TY TNHH CÔNG NGHỆ TADA được thành lập và hoạt động theo
                  pháp luật Việt Nam và được cấp giấy chứng nhận đăng ký doanh
                  số{' '}
                </span>
                <span className="c7">0315802938</span>
                <span className="c2">
                  (sau đây gọi là “chúng tôi” hoặc “TADA Truck” hoặc “Bên cung
                  cấp Ứng Dụng”).
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Chúng tôi cung cấp nền tảng ứng dụng vận tải 4.0, kết nối trực
                  tiếp các chủ hàng đang tìm kiếm dịch vụ vận tải với các chủ
                  xe, chủ doanh nghiệp vận tải trên toàn quốc.
                </span>
              </p>
              <p className="c0">
                <span className="c7">
                  TADA Truck được cấp quyền sử dụng các sản phẩm công nghệ là
                  trang web{' '}
                </span>
                <a className="c10" href="https://www.tadatruck.vn">
                  www.tadatruck.vn
                </a>
                <span className="c2">
                  &nbsp;(sau đây gọi là “Website”). Chúng tôi mang đến giải pháp
                  công nghệ giúp cá nhân, doanh nghiệp tìm kiếm và quản lý xe
                  tải trực tuyến.{' '}
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Vui lòng đọc kỹ Điều Khoản Sử Dụng này. Bằng việc sử dụng Ứng
                  Dụng TADA Truck (như được định nghĩa dưới đây), bạn đồng ý
                  rằng bạn là Bên Sử Dụng Ứng dụng đã đọc và hiểu nội dung của
                  Điều Khoản Sử Dụng này.
                </span>
              </p>
              <h5 className="c6" id="h.9qfy9l6iakoi">
                <span className="c13">2. Định nghĩa các thuật ngữ</span>
              </h5>
              <p className="c0">
                <span className="c2">
                  "Bên Cung cấp Ứng dụng" là TADA Truck, có thông tin được nêu
                  tại phần đầu Điều Khoản Sử Dụng này;
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  "Bên sử dụng Ứng dụng" thương nhân, tổ chức, cá nhân đăng ký
                  sử dụng Ứng dụng/Website TADA Truck, bao gồm cả Chủ hàng
                  (người sử dụng dịch vụ vận tải) và Chủ xe (người cung cấp dịch
                  vụ vận tải)
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  “Chủ hàng”, hay còn gọi là “Bên sử dụng dịch vụ”, là thương
                  nhân, tổ chức, cá nhân và/hoặc có thể là chủ sở hữu của Hàng
                  Hóa và/ hoặc người đại diện đăng tin hộ có nhu cầu sử dụng
                  dịch vụ vận chuyển Hàng Hóa và sử dụng Ứng Dụng/Website để
                  đăng tin. Công ty và/hoặc Người đặt hàng liên đới chịu trách
                  nhiệm trước pháp luật với Bên Cung cấp Ứng dụng theo Thỏa
                  Thuận này.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  "Chủ xe", hay còn gọi là “Bên Cung Cấp Dịch Vụ”, là thương
                  nhân, tổ chức, cá nhân cung cấp dịch vụ vận tải sử dụng Ứng
                  Dụng/Website TADA Truck để kết nối với Bên Sử Dụng Dịch Vụ;
                  được xem các thông tin đơn hàng, có khả năng thực hiện các yêu
                  cầu vận chuyển cho Bên Sử Dụng Dịch Vụ, có thể sở hữu phương
                  tiện vận tải hoặc người đại diện thực hiện.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  "Đơn Hàng" là thông tin vận chuyển Hàng Hóa được Chủ hàng đăng
                  tải lên ứng Dụng/website TADA Truck bao gồm nhưng không giới
                  hạn thông tin về Hàng Hóa, tuyến đường vận chuyển, cách thức
                  đóng gói.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  "Thông báo" là các thông báo trên Ứng Dụng/Website liên quan
                  đến sử dụng Hệ thống, các hoạt động giao dịch thông tin giữa 2
                  bên Bên Sử Dụng Ứng Dụng và các thông tin giới thiệu, quảng bá
                  về TADA Truck.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  "Hàng Hóa" có nghĩa là các sản phẩm, tài sản hoặc các đối
                  tượng khác được phép vận chuyển theo quy định của pháp luật
                  Việt Nam mà Chủ hàng yêu cầu Chủ xe cung cấp dịch vụ vận
                  chuyển theo từng Đơn Hàng
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  "Hệ thống" có nghĩa là hệ thống kết nối vận tải Hàng Hóa trên
                  cơ sở ứng Dụng công nghệ phần mềm và các dịch vụ chăm sóc, hỗ
                  trợ khách hàng kèm theo, được đặt tên là TADA Truck
                </span>
              </p>
              <p className="c0">
                <span className="c7">
                  "Hotline" có nghĩa là đường dây nóng bán hàng và hỗ trợ người
                  dùng của Bên Cung cấp Ứng Dụng: 1900636296
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Để có thể sử dụng Ứng Dụng/Website để kết nối với nhau, trước
                  hết các Bên sử dụng ứng dụng đăng ký tài khoản trên Ứng Dụng
                  và cung cấp các thông tin có liên quan. Sau khi thông tin đã
                  được TADA Truck xác thực, thành viên được coi là Bên Sử Dụng
                  Ứng dụng và được cấp quyền sử dụng các tính năng trên Ứng
                  Dụng/Website.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Nội dung Điều Khoản Sử Dụng này tuân thủ theo các quy định
                  hiện hành của pháp luật Việt Nam. Bên Sử Dụng Ứng Dụng khi
                  tham gia vào Hệ thống của Bên cung cấp Ứng Dụng trên nền tảng
                  Ứng Dụng/Website đồng nghĩa với việc cam kết thực hiện đúng
                  những nội dung trong Điều Khoản Sử Dụng này.
                </span>
              </p>
              <h5 className="c6" id="h.p0v7l0hosc5h">
                <span className="c3">II. Ứng dụng</span>
              </h5>
              <p className="c0">
                <span className="c2">
                  Đối tượng chung: Tất cả các Bên Sử Dụng Ứng Dụng đã có tài
                  khoản được xác thực trên Ứng Dụng và chưa vi phạm bất cứ quy
                  định nào trong quá trình đăng đơn và vận chuyển Hàng Hóa qua
                  Ứng Dụng.
                </span>
              </p>
              <ol className="c4 lst-kix_4kw10v9fnckt-1 start">
                <li className="c5">
                  <span className="c2">Đơn Hàng</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Thông qua Hệ thống Ứng Dụng, Bên Sử Dụng Ứng Dụng, cụ thể là
                  Chủ hàng, sẽ tạo các Đơn Hàng phù hợp theo yêu cầu của mình,
                  bao gồm các thông tin về Hàng Hóa, tuyến đường vận chuyển,
                  cách thức đóng gói.{' '}
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Sau khi nhận đầy đủ thông tin về Đơn Hàng, Bên Sử Dụng Ứng
                  Dụng còn lại, cụ thể là Chủ xe, sẽ Báo Giá cho việc thực hiện
                  Dịch Vụ. Bên Sử Dụng Dịch vụ sẽ chấp thuận Báo Giá của Chủ Xe
                  qua Hệ thống và/hoặc Hotline để tạo thành một giao dịch.
                  &nbsp;
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Giá dịch vụ và các quyền, nghĩa vụ khác do hai (02) Bên Sử
                  Dụng Ứng Dụng thỏa thuận và chịu trách nhiệm.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Để tránh hiểu nhầm, Sàn Vận Chuyển và các tính năng, dịch vụ
                  mà nằm ngoài ứng dụng/ website TADA Truck sẽ không thuộc phạm
                  vi trách nhiệm thực hiện của Bên cung cấp Ứng Dụng. Trong đó,
                  các Chủ Xe bao gồm nhà xe, lái xe đăng ký tài khoản trên Hệ
                  thống sẽ trực tiếp chịu trách nhiệm cung cấp dịch vụ và các
                  trách nhiệm liên quan khác cho khách hàng của mình.
                </span>
              </p>
              <ol className="c4 lst-kix_4kw10v9fnckt-1">
                <li className="c5">
                  <span className="c2">Gói Dịch Vụ Chuyển Hàng</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  2.1 Phạm vi dịch vụ và cách thức sử dụng TADA Truck
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Thông qua Hệ thống Ứng Dụng, và/hoặc Hotline, Bên Sử Dụng Ứng
                  Dụng sẽ tạo và nhận các Đơn Hàng phù hợp theo yêu cầu của
                  mình, bao gồm các thông tin về Hàng Hóa, tuyến đường vận
                  chuyển, cách thức đóng gói. Các Đơn Hàng là một phần không thể
                  tách rời của Thỏa Thuận này.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  2.2. Điều kiện đối với Bên Sử Dụng Ứng dụng{' '}
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Đảm bảo các thông tin đơn hàng được đăng tải trên Ứng dụng
                  TADA Truck là thật. Trong trường hợp bên cung cấp Ứng Dụng
                  phát hiện Đơn Hàng đăng tải là Đơn Hàng ảo, tài khoản của Bên
                  Sử Dụng Dịch Vụ trên Ứng Dụng sẽ bị khóa vĩnh viễn và sẽ bồi
                  thường thiệt hại (nếu có) đối với Bên Sử Dụng Ứng Dụng còn lại
                  (Chủ xe) theo quy định của pháp luật.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Cung cấp thông tin chính xác và đầy đủ về loại, kích cỡ, thông
                  số kỹ thuật và/hoặc bất kỳ đặc điểm cụ thể của Hàng Hóa được
                  vận chuyển trong Đơn Hàng. Hàng Hóa vận chuyển không thuộc
                  danh mục hạn chế, cấm kinh doanh, cấm vận chuyển theo quy định
                  của Pháp luật hiện hành.
                </span>
              </p>
              <p className="c0">
                <span className="c2">2.3. Điều kiện khác</span>
              </p>
              <p className="c0">
                <span className="c2">
                  Bên cung cấp Ứng Dụng sẽ cập nhật đến Các Bên Sử Dụng Ứng Dụng
                  trong trường hợp có những thay đổi về các tính năng trên nền
                  tảng ứng dụng TADA Truck.
                </span>
              </p>
              <p className="c0">
                <span className="c2">2.4. Giao và nhận Hàng Hóa</span>
              </p>
              <p className="c0">
                <span className="c2">
                  Hai (02) Bên Sử DỤng Ứng Dụng sẽ tiến hành kiểm tra sơ bộ Hàng
                  Hóa về loại Hàng Hóa, số lượng Hàng Hóa và quy cách đóng gói
                  và lập biên bản ghi nhận hiện trạng Hàng Hóa được bàn giao
                  (“Biên Bản Giao Nhận Hàng Hóa”).
                </span>
              </p>
              <h5 className="c6" id="h.jcyyd5vign11">
                <span className="c3">
                  III. Quyền và nghĩa vụ của Bên cung cấp Ứng Dụng
                </span>
              </h5>
              <ol className="c4 lst-kix_3nokzwo1wzp4-0 start">
                <li className="c5">
                  <span className="c2">Quyền của Bên cung cấp Ứng Dụng</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">1.1. Quyền chung trên Hệ thống</span>
              </p>
              <ol className="c4 lst-kix_z10j68k9fro8-0 start">
                <li className="c1">
                  <span className="c2">
                    Có quyền yêu cầu Bên Sử Dụng Ứng Dụng cung cấp các thông
                    tin, giấy tờ, tài liệu cần thiết cho việc kiểm chứng các
                    giao dịch phát sinh trên Hệ thống của Bên cung cấp Ứng Dụng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c7">
                    Có quyền tạm dừng hợp tác với Bên Sử Dụng Ứng Dụng trong
                    trường hợp vi phạm các Điều Khoản Sử Dụng của Bên cung cấp
                    Ứng Dụng hoặc có những hành vi trái với bộ{' '}
                  </span>
                  <span className="c11">
                    <span className="c10">Quy tắc ứng xử</span>
                  </span>
                  <span className="c2">
                    &nbsp;dành cho các thành viên trên Hệ thống.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Có quyền đơn phương tạm dừng hợp tác với Bên Sử Dụng Ứng
                    Dụng vi phạm mà không cần báo trước.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Có quyền từ chối giải quyết tranh, khiếu nại khi Bên Sử Dụng
                    Ứng Dụng không thực hiện đúng hướng dẫn.
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  1.2 Quyền đối với Ứng Dụng TADA Truck
                </span>
              </p>
              <ol className="c4 lst-kix_muh7kh4chfsr-0 start">
                <li className="c1">
                  <span className="c2">
                    Kiểm tra tính phù hợp của Hàng Hóa vận chuyển so với Đơn
                    Hàng, các chứng từ vận chuyển tương đương khác liên quan đến
                    Hàng Hóa vận chuyển;
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Các quyền khác theo quy định của Điều Khoản Sử Dụng này và
                    pháp luật liên quan.
                  </span>
                </li>
              </ol>
              <p className="c16 c18">
                <span className="c2"></span>
              </p>
              <ol className="c4 lst-kix_x06fppwohibv-0 start">
                <li className="c5">
                  <span className="c2">Nghĩa vụ của Bên Cung Cấp Ứng dụng</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">2.1. Nghĩa vụ chung trên Hệ thống</span>
              </p>
              <ol className="c4 lst-kix_1yxi6rd6c52-0 start">
                <li className="c1">
                  <span className="c2">
                    Tuân thủ các quy định của pháp luật áp dụng với Website/Ứng
                    Dụng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Xây dựng và công bố công khai trên Website/Ứng Dụng quy chế
                    hoạt động theo quy định của pháp luật; theo dõi và bảo đảm
                    việc thực hiện quy chế trên của Bên cung cấp Ứng Dụng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Kiểm tra và xác thực thông tin đăng ký các tài khoản tham
                    gia hoạt động trên Ứng Dụng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Lưu giữ thông tin đăng ký của Bên Sử Dụng Ứng Dụng ngay từ
                    ngày đăng ký tham gia Ứng Dụng và thường xuyên cập nhật các
                    thông tin thay đổi, bổ sung có liên quan.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Áp dụng các biện pháp cần thiết để đảm bảo an toàn thông
                    tin, không được tiết lộ, chuyển nhượng, cho thuê hoặc bán
                    các thông tin liên quan đến người dùng khi chưa được sự đồng
                    ý của các bên liên quan, trừ trường hợp pháp luật có quy
                    định khác.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Xử lý kịp thời khi phát hiện hoặc nhận được phản ánh về hành
                    vi vi phạm pháp luật, vi phạm chính sách, vi phạm tiêu chuẩn
                    cộng đồng trên Ứng Dụng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Yêu cầu Bên Sử Dụng Ứng Dụng phải cung cấp đầy đủ giấy tờ
                    cần thiết để xác minh tài khoản.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Phối hợp và hỗ trợ cơ quan quản lý Nhà nước điều tra các
                    hành vi vi phạm pháp luật, cung cấp thông tin đăng ký, lịch
                    sử giao dịch và các tài liệu khác về đối tượng có hành vi vi
                    phạm pháp luật.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Duy trì hoạt động bình thường của Ứng Dụng và nhanh chóng
                    khắc phục các sự cố xảy ra ảnh hưởng tới hoạt động như: sự
                    cố kỹ thuật về máy móc, lỗi phần mềm, Hệ thống đường truyền
                    internet, nhân sự, các biến động xã hội, thiên tai, mất
                    điện, các quyết định của cơ quan Nhà nước hay một tổ chức
                    liên quan thứ ba. Trường hợp xảy ra các sự kiện bất khả
                    kháng như: thiên tai, hỏa hoạn, biến động xã hội, các quyết
                    định của cơ quan chức năng... nằm ngoài khả năng kiểm soát
                    thì Bên Cung Cấp Ứng Dụng không phải chịu trách nhiệm liên
                    đới.
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  2.2 Nghĩa vụ đối với Ứng Dụng TADA Truck:
                </span>
              </p>
              <p className="c16">
                <span className="c2">
                  Các nghĩa vụ và trách nhiệm khác theo quy định của Thỏa Thuận
                  và pháp luật liên quan.
                </span>
              </p>
              <h5 className="c6" id="h.14dtf8jhw5l7">
                <span className="c3">
                  IV. Quyền và nghĩa vụ của Bên Sử Dụng Ứng dụng
                </span>
              </h5>
              <ol className="c4 lst-kix_w3wb42blzmb0-0 start">
                <li className="c5">
                  <span className="c2">
                    Quyền của Bên Sử Dụng Ứng dụng, cụ thể là Chủ hàng
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">1.1. Quyền chung trên Hệ thống</span>
              </p>
              <ol className="c4 lst-kix_14dsyvx7w0py-0 start">
                <li className="c1">
                  <span className="c2">
                    Bên Sử Dụng Ứng dụng được Bên cung cấp Ứng Dụng bảo mật các
                    thông tin cá nhân theo quy định về Bảo mật thông tin trên
                    Ứng Dụng điện tử.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Được quyền từ chối dịch vụ hoặc từ chối sử dụng Ứng Dụng mà
                    không cần đưa ra lý do.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Được phép cài đặt Ứng Dụng trên thiết bị di động cá nhân, sử
                    dụng Website cho mục đích sử dụng cá nhân, tổ chức hợp pháp.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Có quyền đóng góp ý kiến cho Bên cung cấp Ứng Dụng trong quá
                    trình hoạt động. Các kiến nghị được gửi trực tiếp bằng thư,
                    điện thoại, email hoặc các kênh phản ánh khác không trái
                    pháp luật đến Bên cung cấp Ứng Dụng.
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  1.2 Quyền đối với Ứng Dụng TADA Truck
                </span>
              </p>
              <ol className="c4 lst-kix_tmwodlgyi0ya-0 start">
                <li className="c1">
                  <span className="c2">
                    Đối với Đơn Hàng do Chủ xe cung cấp dịch vụ, Bên Sử Dụng Ứng
                    dụng có quyền:
                  </span>
                </li>
              </ol>
              <ul className="c4 lst-kix_fmtnr8u32tab-0 start">
                <li className="c1">
                  <span className="c2">
                    Khiếu nại và yêu cầu bồi thường thiệt hại theo quy định tại
                    Hợp Đồng;
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Yêu cầu Bên Cung Cấp Dịch Vụ Thông báo về tiến độ của việc
                    thực hiện Dịch Vụ TADA Truck
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Yêu cầu Bên Cung Cấp Dịch Vụ tuân thủ các quy định nội bộ
                    khi giao, nhận, và vận chuyển Hàng Hóa.
                  </span>
                </li>
              </ul>
              <ol className="c4 lst-kix_eqvxy11dhbxo-0 start">
                <li className="c5">
                  <span className="c2">
                    Nghĩa vụ của Bên Sử Dụng Ứng dụng, cụ thể là Chủ hàng
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">2.1. Nghĩa vụ chung trên Hệ thống</span>
              </p>
              <ol className="c4 lst-kix_rwwicxnw6q1w-0 start">
                <li className="c1">
                  <span className="c2">
                    Cung cấp đầy đủ và chính xác các thông tin xác thực theo yêu
                    cầu của Bên Cung Cấp Ứng dụng khi đăng ký và trong suốt quá
                    trình sử dụng Ứng Dụng hoặc Dịch Vụ của Bên Sử Dụng Ứng Dụng
                    còn lại (cụ thể là Chủ xe).
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Chịu toàn bộ trách nhiệm trong việc sử dụng tài khoản của
                    mình trên Hệ thống của Bên Cung Cấp Ứng dụng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Thực hiện đúng các thao tác cần thực hiện, điền chính xác
                    thông tin Đơn Hàng vào đúng các mục thông tin tương ứng. Bên
                    Cung Cấp Ứng Dụng được miễn trừ trách nhiệm với các thiệt
                    hại xảy ra do thao tác được thực hiện không đúng của Bên Sử
                    Dụng Ứng dụng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Trong trường hợp Bên Sử Dụng Ứng dụng mất thiết bị di động
                    hoặc thay đổi thông tin đăng ký tài khoản, Bên Sử Dụng Ứng
                    Dụng có nghĩa vụ Thông báo cho Bên Cung Cấp Ứng dụng để được
                    tiến hành thủ tục thay đổi hoặc tạm thời chặn các giao dịch
                    có liên quan giúp Bên Sử Dụng Ứng dụng quản lý quá trình sử
                    dụng ứng dụng của mình. Bên cung cấp Ứng Dụng sẽ không chịu
                    trách nhiệm hoặc giải quyết khiếu nại trong trường hợp Bên
                    Sử Dụng Ứng dụng không Thông báo cho Bên cung cấp Ứng Dụng
                    dẫn đến việc có bên thứ ba sử Dụng tài khoản đó của Bên Sử
                    Dụng Ứng dụng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Không được ủy quyền, chuyển nhượng hay chuyển giao tài khoản
                    của mình với bất kỳ hình thức nào cho bên thứ ba bất kỳ.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Không được sử dụng tài khoản không phải của mình để yêu cầu
                    thực hiện dịch vụ và chịu trách nhiệm trước pháp luật đối
                    với toàn bộ Hàng Hóa mà mình yêu cầu Bên Cung Cấp Dịch Vụ
                    thực hiện Dịch Vụ.{' '}
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Phải cung cấp đầy đủ hóa đơn, chứng từ hợp pháp khi yêu cầu
                    Bên Cung Cấp Dịch Vụ thực hiện dịch vụ.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Không được &nbsp;hsử Dụng dịch vụoặc Ứng Dụng nhằm mục đích
                    trái pháp luật.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Chịu trách nhiệm về tính chính xác của các thông tin mà mình
                    cung cấp hoặc bổ sung cần thiết khi sử dụng dịch vụ của Bên
                    Cung Cấp Dịch Vụ.{' '}
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Không được sử dụng Dịch Vụ hoặc Ứng Dụng để gây phiền toái
                    hoặc làm khó tài xế trên Hệ thống của Bên Cung Cấp Dịch Vụ.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Không được cố tình bôi nhọ danh dự, vu khống, hoặc bịa đặt
                    những điều làm tổn hại đến danh dự, uy tín của Bên Cung Cấp
                    Dịch Vụ.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Bên Sử Dụng Dịch Vụ phải cung cấp và chịu trách nhiệm về
                    tính chính xác về thông tin người nhận Hàng Hóa để tài xế
                    liên hệ và giao hàng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Bên Sử Dụng Dịch Vụ không được sao chép, sử dụng các thông
                    tin, nội dung trên Ứng Dụng của Bên Cung Cấp Dịch Vụ mà
                    không có sự cho phép bằng văn bản của Bên Cung Cấp Dịch Vụ
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Bên Sử Dụng Dịch Vụ phải thanh toán cước phí theo đúng thỏa
                    thuận của Bên Cung Cấp Dịch Vụ hoặc của Chủ xe. Chịu trách
                    nhiệm thanh toán Giá Vận Chuyển và các Khoản Chi Hộ, chi phí
                    phát sinh theo quy định tại Phụ lục 1;
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Thực hiện đầy đủ nghĩa vụ thuế theo quy định của pháp luật.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Không đăng tải các thông tin về Hàng Hóa/dịch vụ thuộc danh
                    mục hạn chế, cấm kinh doanh theo NĐ 59/2015/NĐ-CP.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Thực hiện theo đúng theo hướng dẫn của nhân viên Bên cung
                    cấp Ứng Dụng trong quá trình vận hành Đơn Hàng.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Bên Sử Dụng Dịch vụ có trách nhiệm quản lý và bảo mật tài
                    khoản Ứng Dụng được cấp bởi Bên Cung cấp Dịch vụ, đồng thời
                    tuân thủ các quy định sử dụng Ứng Dụng;
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  2.2 Nghĩa vụ đối với Ứng Dụng TADA Truck:
                </span>
              </p>
              <ol className="c4 lst-kix_giewy1ul3jt5-0 start">
                <li className="c1">
                  <span className="c2">
                    Trong trường hợp Bên Sử Dụng Dịch vụ bao gồm Công ty và
                    Người đặt hàng, Công ty và Người đặt hàng liên đới chịu
                    trách nhiệm về thực hiện nghĩa vụ của mỗi Đơn Hàng được đặt
                    qua tài khoản theo Điều Khoản Sử Dụng này.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Chịu trách nhiệm về tính hợp pháp, nguồn gốc xuất xứ và các
                    chứng từ liên quan của Hàng Hóa trước pháp luật và cơ quan
                    có thẩm quyền; cung cấp đầy đủ giấy tờ hợp pháp để Hàng Hóa
                    lưu thông hợp lệ. Trong trường hợp Bên cung cấp Ứng Dụng
                    và/hoặc cơ quan có thẩm quyền phát hiện các vấn đề không hợp
                    pháp của Hàng Hóa, Bên cung cấp Ứng Dụng được toàn quyền hủy
                    bỏ việc vận chuyển Đơn Hàng và/hoặc đơn phương chấm dứt Thỏa
                    Thuận mà không phải chịu bất cứ trách nhiệm gì. Bên Sử Dụng
                    Dịch vụ có trách nhiệm bồi thường cho Bên Cung cấp Dịch vụ
                    các thiệt hại, chi phí phát sinh và tiền phạt vi phạm tương
                    đương 8% Giá Vận Chuyển;
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Các nghĩa vụ và trách nhiệm khác theo quy định của Thỏa
                    Thuận và pháp luật liên quan.
                  </span>
                </li>
              </ol>
              <h5 className="c6" id="h.wsjaz3ce43vv">
                <span className="c3">
                  V. Giới hạn trách nhiệm và Bảo hiểm với TADA Truck
                </span>
              </h5>
              <ol className="c4 lst-kix_ckfxksc57nid-0 start">
                <li className="c5">
                  <span className="c2">
                    Trách nhiệm của Bên Cung cấp Dịch vụ đối với mỗi Đơn Hàng
                    tùy thuộc Thỏa Thuận song phương giữa Bên Sử Dụng Dịch Vụ
                    (Chủ hàng) và Bên Cung Cấp Dịch VỤ (Chủ xe)
                  </span>
                </li>
                <li className="c5">
                  <span className="c2">
                    Bên Cung cấp Dịch vụ đảm bảo phương tiện vận tải được mua và
                    duy trì bảo hiểm trách nhiệm dân sự của chủ xe cơ giới trong
                    quá trình vận chuyển Đơn Hàng theo yêu cầu của luật pháp
                    Việt Nam
                  </span>
                </li>
              </ol>
              <h5 className="c6" id="h.rs5bmku6rfc0">
                <span className="c3">VI. Bồi thường thiệt hại</span>
              </h5>
              <ol className="c4 lst-kix_7e40v62i8fyp-1 start">
                <li className="c19">
                  <span className="c2">
                    Bồi Thường Thiệt Hại Liên Quan Hàng Hóa
                  </span>
                </li>
              </ol>
              <ol className="c4 lst-kix_7g0kzsxytgtw-0 start">
                <li className="c1">
                  <span className="c2">
                    Bất kể các quy định khác tại Thỏa Thuận này, Bên cung cấp
                    Ứng Dụng sẽ không phải chịu bất kỳ trách nhiệm nào đối với
                    các tổn thất, mất mát, hư hỏng Hàng Hóa trong các trường hợp
                    như dưới đây:
                  </span>
                </li>
              </ol>
              <ol className="c4 lst-kix_x5yiycsrbw3w-1 start">
                <li className="c8">
                  <span className="c2">
                    Thuộc trường hợp loại trừ trách nhiệm của bên vận chuyển
                    theo quy định pháp luật;
                  </span>
                </li>
                <li className="c8">
                  <span className="c2">
                    Đối với hàng lẻ đóng gói theo bao/thùng/kiện/pallet nguyên
                    đai, nguyên kiện, Bên Cung cấp Dịch vụ chỉ chịu trách nhiệm
                    về bên ngoài của hàng hoá, không chịu trách nhiệm đối với
                    chất lượng, phẩm chất, cân nặng, … bên trong của kiện hàng;
                  </span>
                </li>
                <li className="c8">
                  <span className="c2">
                    Các bên Sử Dụng Ứng Dụng không tuân thủ quy trình khiếu nại.
                  </span>
                </li>
              </ol>
              <p className="c0 c9">
                <span className="c2">2. &nbsp;Bồi Thường Thiệt Hại Khác</span>
              </p>
              <p className="c0">
                <span className="c2">
                  Nếu một bên vi phạm bất kỳ một nghĩa vụ, cam đoan và bảo đảm,
                  cam kết khác theo Điều Khoản Sử Dụng này mà không phải do sự
                  kiện bất khả kháng (bao gồm nhưng không giới hạn lũ lụt, thiên
                  tai, mưa bão, tai nạn do lỗi khách quan…) (“Bên Vi Phạm”), Bên
                  Vi Phạm phải bồi thường và giữ cho Bên còn lại không bị thiệt
                  hại bởi bất kỳ mất mát, thiệt hại, trách nhiệm, phí tổn, chi
                  phí hay yêu cầu bồi thường nào (bao gồm bất kỳ chi phí để thuê
                  luật sư và chi phí phát sinh nào có liên quan) đã phải gánh
                  chịu trực tiếp bởi Bên không vi phạm phát sinh từ hành vi vi
                  phạm Hợp Đồng, với điều kiện trách nhiệm của Bên B đối với mỗi
                  Đơn Hàng theo Hợp Đồng này không vượt quá tổng Giá Vận Chuyển
                  và Khoản Chi Hộ của Đơn Hàng đó. Các hành vi vi phạm, và các
                  khoản bồi thường chi phí sẽ bao gồm nhưng không giới hạn các
                  trường hợp sau:
                </span>
              </p>
              <ol className="c4 lst-kix_cmdvz451ri27-1 start">
                <li className="c8">
                  <span className="c2">
                    Trường hợp Bên Sử Dụng Dịch vụ chậm trễ trong việc sắp xếp
                    giao nhận Hàng Hóa cho người nhận và giao Hàng Hóa của Bên
                    Cung cấp Dịch vụ thì Bên Sử Dụng Dịch vụ đồng ý chịu toàn bộ
                    chi phí phát sinh do việc chậm trễ đó.
                  </span>
                </li>
                <li className="c8">
                  <span className="c2">
                    Trường hợp Bên Sử Dụng Dịch vụ có lỗi trong việc phương tiện
                    vận tải của Bên Cung cấp Dịch vụ bị lưu giữ, Bên Sử Dụng
                    Dịch vụ đồng ý thanh toán cho Bên Cung cấp Dịch vụ một khoản
                    tiền phạt là một (01) triệu đồng/ 01 phương tiện cho mỗi hai
                    mươi tư (24) giờ đồng hồ phương tiện vận tải bị lưu giữ. Quy
                    định này không giới hạn quyền yêu cầu bồi thường các thiệt
                    hại phát sinh của Bên Cung cấp Dịch vụ đối với Bên Sử Dụng
                    Dịch vụ tại các Điều khoản khác trong Điều Khoản Sử Dụng
                    này;
                  </span>
                </li>
                <li className="c8">
                  <span className="c2">
                    Trường hợp Bên Cung cấp Dịch vụ không đáp ứng các yêu cầu
                    tại Đơn Hàng do lỗi của Bên Cung cấp Dịch vụ theo quy định
                    tại Điều Khoản Sử Dụng, thì Bên Cung cấp Dịch vụ phải chịu
                    bồi thường thiệt hại và chi phí phát sinh theo mức giới hạn
                    tại Mục IX;
                  </span>
                </li>
                <li className="c8">
                  <span className="c2">
                    Các trường hợp phạt vi phạm và bồi thường thiệt hại khác
                    theo quy định tại Điều Khoản Sử Dụng này và pháp luật.
                  </span>
                </li>
              </ol>
              <h5 className="c6" id="h.8gd4ezacxnm4">
                <span className="c3">
                  VII. Quy trình giải quyết khiếu nại, tranh chấp
                </span>
              </h5>
              <ol className="c4 lst-kix_hscgboeb7vj2-0 start">
                <li className="c5">
                  <span className="c2">
                    Đối với Đơn Hàng, các Bên sử dụng Ứng Dụng tự thỏa thuận
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Bên Sử Dụng Dịch Vụ và Bên Cung Cấp Dịch Vụ thực hiện giao
                  dịch và thỏa thuận trực tiếp với nhau. Trong trường hợp phát
                  sinh tranh chấp, Bên cung cấp Ứng Dụng đề cao giải pháp thương
                  lượng, hòa giải giữa các bên. Do đó, Bên Sử Dụng Dịch Vụ và
                  Bên Cung Cấp Dịch Vụ nên làm việc dựa trên giấy tờ rõ ràng để
                  giải quyết thỏa đáng nhất.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Bên Sử Dụng Dịch Vụ và Bên Cung Cấp Dịch Vụ có trách nhiệm
                  trong việc tích cực giải quyết vấn đề. Bên cung cấp Ứng Dụng
                  sẽ đóng vai trò phối hợp, hỗ trợ việc xử lý và giải quyết
                  khiếu nại giữa các bên. Bên cung cấp Ứng Dụng sẽ cung cấp
                  những thông tin cần thiết để giải quyết tranh chấp giữa các
                  bên liên quan hoặc khi cơ quan pháp luật có thẩm quyền yêu
                  cầu. Sau khi các thành viên đã giải quyết xong tranh chấp,
                  khiếu nại nên Thông báo cho Bên cung cấp Ứng Dụng.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Bên Cung Cấp Dịch Vụ tôn trọng và nghiêm túc thực hiện các quy
                  định của pháp luật về bảo vệ quyền lợi của người tiêu dùng. Vì
                  vậy, đề nghị các thành viên có những hành vi phù hợp và nghiêm
                  túc tuân thủ các quy định của pháp luật. Bất cứ hành vi lừa
                  đảo, gian lận trong kinh doanh, cũng như hành vi gây tổn hại
                  đến người khác đều đáng lên án và phải chịu hoàn toàn trách
                  nhiệm trước pháp luật.
                </span>
              </p>
              <ol className="c4 lst-kix_7648emcko32p-0 start">
                <li className="c5">
                  <span className="c2">
                    Đối với Đơn Hàng được tạo trên nền tảng ứng dụng TADA Truck
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Bước 1: Phản hồi với Bên cung cấp Ứng Dụng bằng cách gọi điện
                  thoại đến số 1900636296, hoặc gửi phản hồi qua hộp thư điện tử
                  hotro@tada.global. Đồng thời, Bên Sử Dụng Ứng Dụng phải gửi
                  yêu cầu hỗ trợ đến Bên cung cấp Ứng Dụng trong thời hạn ba
                  (03) ngày làm việc kể từ ngày phát sinh vấn đề cần hỗ trợ.{' '}
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Lưu ý: Hết thời hạn nêu tại Bước 1 này, Bên cung cấp Ứng Dụng
                  sẽ không giải quyết bất kỳ khiếu nại nào từ Bên Sử Dụng Dịch
                  vụ.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Bước 2: Trong vòng ba (03) ngày làm việc, kể từ khi nhận được
                  khiếu nại, Bên cung cấp Ứng Dụng sẽ kiểm tra, xác nhận thông
                  tin và Thông báo cho các bên có liên quan. Bên cung cấp Ứng
                  Dụng cũng sẽ đồng thời tiến hành xác minh nội dung khiếu nại,
                  xem xét và phân tích nguyên nhân dẫn đến khiếu nại, phạm vi
                  khiếu nại và trách nhiệm xử lý để phối hợp với các Bên Sử Dụng
                  Dịch Vụ để đưa ra giải pháp xử lý phù hợp.
                </span>
              </p>
              <ol className="c4 lst-kix_efnfk1v3rqfx-0 start">
                <li className="c5">
                  <span className="c2">Khiếu nại khác</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Trường hợp giao dịch phát sinh mâu thuẫn liên quan đến hành vi
                  vi phạm Quy tắc ứng xử và nội dung hợp đồng mà Bên Cung Cấp
                  Ứng Dụng và Bên Sử Dụng Dịch Vụ đã cam kết, Bên cung cấp Ứng
                  Dụng sẽ áp dụng các biện pháp xử lý vi phạm tương ứng.
                </span>
              </p>
              <h5 className="c6" id="h.o18deehgtm4s">
                <span className="c3">
                  VIII. Phân định trách nhiệm giữa Bên Sử Dụng Dịch Vụ, Chủ xe
                  và Bên cung cấp Ứng Dụng trong việc giải quyết các vấn đề phát
                  sinh từ giao dịch thực hiện trên ứng Dụng
                </span>
              </h5>
              <p className="c0">
                <span className="c2">
                  Nếu có tranh chấp phát sinh giữa các người dùng với nhau thì
                  các bên sẽ giải quyết trên cơ sở tự thỏa thuận, thương lượng
                  và hoà giải. Bên cung cấp Ứng Dụng sẽ hỗ trợ Bên khiếu nại
                  bằng cách cử nhân viên liên lạc, hoà giải nếu tập hợp thông
                  tin cụ thể và xác thực về sự việc bị vi phạm. Nếu vụ việc vượt
                  quá thẩm quyền và khả năng, Bên cung cấp Ứng Dụng sẽ đề nghị
                  Bên bị vi phạm chuyển vụ việc cho các cơ quan chức năng có
                  thẩm quyền. Trong trường hợp này, Bên cung cấp Ứng Dụng vẫn hỗ
                  trợ để bảo vệ tốt nhất Bên bị vi phạm
                </span>
              </p>
              <h5 className="c6" id="h.wsleg63zo2gu">
                <span className="c3">
                  IX. Chính sách bảo vệ thông tin cá nhân của thành viên
                </span>
              </h5>
              <p className="c0">
                <span className="c2">
                  Tùy theo từng thời điểm, Bên cung cấp Ứng Dụng có thể điều
                  chỉnh, sửa đổi Chính sách bảo vệ thông tin. Nếu như Bên Sử
                  Dụng Ứng Dụng quan tâm về quyền riêng tư cá nhân của mình, xin
                  vui lòng truy cập trang này thường xuyên hơn để được cập nhật
                  những thông tin mới nhất có thể. Nếu như Bên cung cấp Ứng Dụng
                  thực hiện các thay đổi đối với Chính sách bảo vệ thông tin và
                  tất nhiên điều này sẽ ảnh hưởng đến quyền lợi của Bên Sử Dụng
                  Ứng Dụng (ví dụ: nếu Bên cung cấp Ứng Dụng có ý định xử lý dữ
                  liệu cá nhân của Bên Sử Dụng Ứng Dụng cho các mục đích khác so
                  với Thông báo trước đây trong Chính sách bảo vệ thông tin
                  này), Bên cung cấp Ứng Dụng sẽ Thông báo cho bạn về những thay
                  đổi này trước khi các hoạt động mới bắt đầu.
                </span>
              </p>
              <ol className="c4 lst-kix_dmyi0gv4i4u8-0 start">
                <li className="c5">
                  <span className="c2">
                    Mục đích và phạm vi thu thập thông tin
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Để đảm bảo rằng giao dịch được thực hiện một cách thành công
                  nhất và giảm thiểu tối đa rủi ro có thể phát sinh và nhằm đảm
                  bảo quyền lợi tốt nhất cho Bên Sử Dụng Ứng Dụng, khi đăng ký
                  sử dụng ứng dụng mà do Bên cung cấp Ứng Dụng cung cấp, Bên Sử
                  Dụng Ứng Dụng phải cung cấp đầy đủ thông tin ban đầu gồm: họ
                  tên, số điện thoại, email. Các thông tin này sẽ được bảo mật
                  tuyệt đối, sẽ được thẩm định và lưu trữ trong Hệ thống của Bên
                  cung cấp Ứng Dụng.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Bên Sử Dụng Ứng Dụng sẽ tự chịu trách nhiệm về bảo mật và lưu
                  giữ mọi hoạt động sử dụng ứng dụng dưới tên đăng ký, mật khẩu
                  và hộp thư điện tử của mình. Ngoài ra, các Bên Sử Dụng Ứng
                  Dụng có trách nhiệm thông báo kịp thời cho Bên cung cấp Ứng
                  Dụng về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo
                  mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện
                  pháp giải quyết phù hợp.
                </span>
              </p>
              <ol className="c4 lst-kix_hyd1lltro1f0-0 start">
                <li className="c5">
                  <span className="c2">
                    Địa chỉ đơn vị thu thập và bảo quản thông tin
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">Công ty TNHH Công nghệ TADA</span>
              </p>
              <p className="c0">
                <span className="c2">
                  Địa chỉ: 37 đường số 2 phường Bình An, quận 02, thành phố Hồ
                  Chí Minh
                </span>
              </p>
              <p className="c0">
                <span className="c7">Điện thoại: </span>
                <span className="c7">02836363299</span>
              </p>
              <ol className="c4 lst-kix_9pwmdnc0criz-0 start">
                <li className="c5">
                  <span className="c2">Phạm vi sử dụng thông tin</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Việc thu thập thông tin nhằm mục đích:
                </span>
              </p>
              <ul className="c4 lst-kix_t7xrx4l645u0-0 start">
                <li className="c1">
                  <span className="c2">
                    Cung cấp đầy đủ các tính năng, tiện ích đến cho Bên Sử Dụng
                    Ứng Dụng
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Gửi thông báo về các hoạt động trao đổi thông tin giữa các
                    Bên Sử Dụng Ứng Dụng
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Ngăn chặn các hoạt động phá hủy tài khoản người dùng của
                    thành viên và các hoạt động giả mạo Bên Sử Dụng Ứng Dụng
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Liên lạc và giải quyết với các Bên Sử Dụng Ứng Dụng trong
                    những trường hợp đặc biệt
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Không sử dụng các thông tin cá nhân của các Bên Sử Dụng Ứng
                    Dụng ngoài mục đích xác nhận và liên hệ có liên quan đến
                    giao dịch trên Ứng Dụng
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Trong trường hợp pháp luật có yêu cầu: Bên Cung Cấp Ứng Dụng
                    có trách nhiệm hợp tác, cung cấp thông tin cần thiết. Ngoài
                    ra, không một ai có quyền xâm phạm vào thông tin cá nhân của
                    các Bên Sử Dụng Ứng Dụng.
                  </span>
                </li>
              </ul>
              <ol className="c4 lst-kix_kemzyb793w6d-0 start">
                <li className="c5">
                  <span className="c2">Cam kết bảo mật thông tin</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Bên cung cấp Ứng Dụng cam kết sẽ không tiết lộ thông tin của
                  các Bên Sử Dụng Ứng Dụng cho bất kỳ tổ chức, cá nhân nào khác.
                  Trong một vài trường hợp đặc biệt, Bên cung cấp Ứng Dụng có
                  thể bị yêu cầu phải tiết lộ thông tin cá nhân, ví dụ như khi
                  có căn cứ cho việc tiết lộ thông tin là cần thiết để ngăn chặn
                  các mối đe dọa về tính mạng và sức khỏe, hay cho mục đích thực
                  thi pháp luật. Bên cung cấp Ứng Dụng cam kết tuân thủ tuyệt
                  đối các quy tắc bảo mật thông tin, chính sách bảo mật và an
                  toàn thông tin này.
                </span>
              </p>
              <ol className="c4 lst-kix_h0iwxtrrljm1-0 start">
                <li className="c5">
                  <span className="c2">Thời gian lưu trữ thông tin</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Bên cung cấp Ứng Dụng sẽ lưu trữ các thông tin do khách hàng
                  cung cấp trên các Hệ thống nội bộ của chúng tôi trong quá
                  trình khách hàng sử dụng hoặc khi khách hàng có yêu cầu hủy
                  các thông tin đã cung cấp trong quá trình sử dụng.
                </span>
              </p>
              <ol className="c4 lst-kix_8dmt3ovmr3bf-0 start">
                <li className="c5">
                  <span className="c2">
                    Cơ chế tiếp nhận và giải quyết khiếu nại liên quan đến việc
                    thông tin cá nhân khách hàng
                  </span>
                </li>
              </ol>
              <p className="c0">
                <span className="c7">
                  Các Bên Sử Dụng Ứng Dụng có quyền gửi khiếu nại về việc lộ
                  thông tin các nhân cho bên thứ 3 đến Bên cung cấp Ứng Dụng
                  bằng việc gửi thư hoặc qua email:{' '}
                </span>
                <span className="c17">hotro@tada.global.</span>
              </p>
              <p className="c0">
                <span className="c2">
                  Công ty có trách nhiệm thực hiện các biện pháp kỹ thuật,
                  nghiệp vụ để xác minh các nội dung được phản ánh.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Thời gian xử lý phản ánh liên quan đến thông tin cá nhân khách
                  hàng là 15 ngày.
                </span>
              </p>
              <h5 className="c6" id="h.bs4tr1h8ilqa">
                <span className="c3">
                  X. Trách nhiệm trong trường hợp phát sinh lỗi kỹ thuật
                </span>
              </h5>
              <p className="c0">
                <span className="c7">Bên cung cấp Ứng Dụng</span>
                <span className="c2">
                  &nbsp;cam kết nỗ lực đảm bảo sự an toàn và ổn định của toàn bộ
                  Hệ thống kỹ thuật. Tuy nhiên, trong trường hợp xảy ra sự cố do
                  lỗi của Bên cung cấp Ứng Dụng, chúng tôi sẽ ngay lập tức áp
                  dụng các biện pháp kỹ thuật cần thiết để đảm bảo an toàn, ổn
                  định của toàn bộ Hệ thống và quyền lợi cho các Bên Sử Dụng Ứng
                  Dụng.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Bên cung cấp Ứng Dụng cam kết cung cấp ứng dụng hoạt động
                  trong điều kiện tốt nhất cho các Bên Sử Dụng Ứng Dụng. Trong
                  trường hợp phát hiện các lỗi kỹ thuật, lỗi phần mềm hoặc các
                  lỗi khách quan khác trong quá trình sử dụng thì Bên Sử Dụng
                  Ứng Dụng thông báo cho Bên cung cấp Ứng Dụng qua địa chỉ
                  email: hotro@tada.global hoặc tổng đài 1900636296, chúng tôi
                  sẽ khắc phục lỗi trong thời gian sớm nhất. Tuy nhiên, Bên cung
                  cấp Ứng Dụng sẽ không chịu trách nhiệm giải quyết trong trường
                  hợp thông báo của các Bên Sử Dụng Ứng Dụng không đến được Bên
                  cung cấp Ứng Dụng, phát sinh từ lỗi kỹ thuật, lỗi đường
                  truyền, phần mềm hoặc các lỗi khác không do Bên cung cấp Ứng
                  Dụng gây ra.
                </span>
              </p>
              <h5 className="c6" id="h.ze64558z3r2">
                <span className="c3">XI. Điều khoản chung</span>
              </h5>
              <ol className="c4 lst-kix_27ng5pintwxk-0 start">
                <li className="c5">
                  <span className="c2">Điều khoản áp dụng</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Điều Khoản Sử Dụng Ứng Dụng của Bên cung cấp Ứng Dụng có hiệu
                  lực từ khi được ban hành công khai và có hiệu lực khi các Bên
                  Sử Dụng Ứng Dụng xác nhận trên Ứng Dụng. Bên cung cấp Ứng Dụng
                  có quyền điều chỉnh, thay đổi các quy chế để phù hợp với các
                  hoạt động của Bên cung cấp Ứng Dụng cũng như thuận tiện cho
                  Bên Sử Dụng Ứng Dụng. Những thay đổi này sẽ được Thông báo
                  trên website và trên Ứng Dụng của Bên cung cấp Ứng Dụng. Quy
                  chế được sửa đổi hoặc điều chỉnh sẽ có hiệu lực kể từ ngày có
                  Thông báo thay đổi. Việc các Bên Sử Dụng Ứng Dụng tiếp tục sử
                  dụng ứng dụng sau khi quy chế đã điều chỉnh hoặc thay đổi được
                  công bố đồng nghĩa với việc Bên Sử Dụng Dịch Vụ đã đọc, hiểu
                  và đồng ý với quy chế sửa đổi đó. Bên Sử Dụng Ứng Dụng có
                  trách nhiệm tuân thủ các quy chế hiện hành khi sử dụng ứng
                  dụng của Bên cung cấp Ứng Dụng.
                </span>
              </p>
              <ol className="c4 lst-kix_jwx4648p7lin-0 start">
                <li className="c5">
                  <span className="c2">Điều khoản cam kết</span>
                </li>
              </ol>
              <p className="c0">
                <span className="c2">
                  Về phía Bên Sử Dụng Ứng Dụng: mọi thành viên tham gia sử dụng
                  các tính năng tiện ích trên ứng dụng của Bên cung cấp Ứng Dụng
                  đồng nghĩa với việc các Bên Sử Dụng Ứng Dụng đã đọc và chấp
                  nhận những quy định và quy chế mà Bên cung cấp Ứng Dụng đã đưa
                  ra.
                </span>
              </p>
              <p className="c0">
                <span className="c2">
                  Về Phía Bên cung cấp Ứng Dụng: chúng tôi cam kết thực hiện
                  đúng những quy định và trách nhiệm được nêu ra trong Thỏa
                  Thuận.
                </span>
              </p>
              <ol className="c4 lst-kix_5pe11ekjb57f-0 start">
                <li className="c5">
                  <span className="c2">Điều khoản khác</span>
                </li>
              </ol>
              <ol className="c4 lst-kix_12ub4w182do-0 start">
                <li className="c1">
                  <span className="c2">
                    Điều Khoản Sử Dụng này và Thỏa Thuận được điều chỉnh và giải
                    thích theo pháp luật Việt Nam. Mọi tranh chấp phát sinh từ
                    hoặc liên quan đến Thỏa thuận, sẽ được Các Bên giải quyết
                    trước tiên bằng hình thức thương lượng, hòa giải trên tinh
                    thần thiện chí và hợp tác. Nếu Các Bên không thể giải quyết
                    được theo hình thức thương lượng, hòa giải, tranh chấp sẽ
                    được đưa ra giải quyết tại Tòa Án có thẩm quyền của Việt
                    Nam.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Các bên đồng ý với việc sử dụng chức năng xác nhận qua Hệ
                    thống để giao kết, thực hiện Thỏa thuận. Bằng thao tác xác
                    nhận bởi Bên Sử Dụng Ứng Dụng hoặc người đại diện có thẩm
                    quyền theo thông tin cung cấp, Bên Sử Dụng Ứng Dụng xác nhận
                    giá trị pháp lý của Thỏa thuận, và chịu hoàn toàn trách
                    nhiệm trong trường hợp có khiếu nại, kiện tụng liên quan đến
                    giá trị Thỏa Thuận này.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Các Bên thống nhất rằng việc không sử dụng con dấu doanh
                    nghiệp của mỗi Bên trong Thỏa Thuận được giao kết thông qua
                    phương tiện điện tử này không làm ảnh hưởng đến hiệu lực của
                    Thỏa Thuận.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Nếu bất kỳ Điều khoản nào của Thỏa Thuận không có hiệu lực
                    theo pháp luật Việt Nam, việc vô hiệu của Điều khoản đó vẫn
                    sẽ không ảnh hưởng đến hiệu lực của các Điều khoản còn lại
                    của Hợp Đồng, trừ khi pháp luật Việt Nam có quy định khác.{' '}
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Bất kể các quy định theo pháp luật Việt Nam về hợp đồng theo
                    mẫu và Điều kiện giao dịch chung, Các Bên đồng ý với các
                    Điều khoản tại Thỏa Thuận này.
                  </span>
                </li>
                <li className="c1">
                  <span className="c2">
                    Thỏa Thuận được lập và được lưu trữ dưới dạng điện tử. Mỗi
                    Bên cam kết đã hiểu toàn bộ nội dung Hợp đồng để thực hiện.
                  </span>
                </li>
              </ol>
              <p className="c15">
                <span className="c17"></span>
              </p>
            </>
          ) : lang === 'kr' ? (
            <>
              <p className="c0">
                <span className="c1">이용 약관</span>
              </p>
              <p className="c0 c8">
                <span className="c1"></span>
              </p>
              <p className="c0">
                <span className="c1">I. 일반 원칙</span>
              </p>
              <p className="c0 c8">
                <span className="c1"></span>
              </p>
              <p className="c0">
                <span className="c3">
                  www.TADATruck.vn은 배송할 상품이 필요한 사람들과 트럭이 필요한
                  사람들을 연결하고 정보 교환 서비스를 제공하는 TADA Vietnam의
                  웹 사이트입니다. (이하 TADA Truck).
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  서비스 형태는 상품 배송을 필요로 하는 사람과 물류 회사 간의
                  연결 기능을 제공하는 것입니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  이 원칙은 가입한 이용자에게 적용되며 www.TADATruck.vn에서 운송
                  서비스를 제공합니다. www.TADATruck.vn에 참여하는 상인, 조직 및
                  개인, TADA Truck은 서비스를 사용하고 제공하는 당사자의
                  합법적인 권리와 이익을 존중하는 범위 내에서 법적 규정에
                  위배되지 않는 계약을 자유롭게 하는 데에 동의합니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c7">
                <span className="c1">II. 일반적인 규칙</span>
              </p>
              <p className="c7 c8">
                <span className="c1"></span>
              </p>
              <p className="c0">
                <span className="c3">1. 웹</span>
              </p>
              <p className="c0">
                <span className="c3">웹 사이트 이름 : TADA Truck</span>
              </p>
              <p className="c0">
                <span className="c6">도메인 이름 : </span>
                <span className="c12">
                  <a
                    className="c16"
                    href="https://www.google.com/url?q=http://www.tadatruck.vn&amp;sa=D&amp;ust=1606385308201000&amp;usg=AOvVaw2w3hcIs2DMu5AmxDxLUSC-"
                  >
                    www.TADATruck.vn
                  </a>
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">2. 정의</span>
              </p>
              <ul className="c9 lst-kix_8gyduyzax6x7-0 start">
                <li className="c0 c10">
                  <span className="c3">
                    주문 : 화주가 게시한 상품 정보입니다.
                  </span>
                </li>
                <li className="c0 c10">
                  <span className="c3">
                    화주 : 상품 운송 요청을 게시한 사람으로 상품의 소유자 또는
                    대리인일 수 있습니다.
                  </span>
                </li>
                <li className="c0 c10">
                  <span className="c3">
                    트럭 사업자 : 주문 정보를 보는 사람은 화주의 배송 요청을
                    수행할 수 있습니다. 운송 차량을 소유하거나 공인된 대리인일
                    수 있습니다.
                  </span>
                </li>
                <li className="c0 c10">
                  <span className="c3">
                    알림 : 시스템 사용, 거래 활동의 소개 및 홍보, 화주와 트럭
                    사업자 간의 정보(있는 경우)와 관련된 TADA Truck의
                    알림입니다.
                  </span>
                </li>
                <li className="c0 c10">
                  <span className="c3">
                    이용자 : 화주 (운송 서비스 이용자) 및 트럭 사업자 (운송
                    서비스 제공 업체) 포함. TADA Truck의 이용자는 웹 사이트에서
                    서비스를 제공하거나 사용할 것을 요구하는 상인, 조직 및
                    개인입니다. 가입한 &nbsp;이용자는 관련 개인 정보를 TADA
                    Truck에 제공하여 이용자로 공식적으로 인정받으며
                    &nbsp;www.TADATruck.vn에서 서비스를 사용할 수 있도록
                    허용됩니다..
                  </span>
                </li>
                <li className="c2">
                  <span className="c3">
                    TADA Truck에 가입할 때, 이용자는 다음 사항에 동의합니다.
                  </span>
                </li>
              </ul>
              <p className="c7 c8 c14">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">
                  + 이용자는 사용할 개인 계정을 생성할 수 있습니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  + 이용자는 www.TADATruck.vn에서 제공하는 정보 및 응용 프로그램
                  기능을 사용할 수 있습니다.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c7">
                <span className="c3">
                  이 규정의 내용은 베트남 법률의 현행 조항을 준수합니다.
                  www.TADATruck.vn에 참여하는 이용자는 베트남 현행법에 대한 법적
                  책임을 파악하고 이 규정을 준수하는 데에 동의해야 합니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">III. 운송 응용 프로그램-TADATruck</span>
              </p>
              <p className="c0 c8">
                <span className="c1"></span>
              </p>
              <p className="c0">
                <span className="c3">1. TADA Truck의 이용자</span>
              </p>
              <p className="c0">
                <span className="c3">
                  TADA Truck 플랫폼에서 계정을 인증하고 TADA Truck 응용
                  프로그램을 통해 상품을 등록하고 운송하는 과정에서 약관을
                  위반하지 않은 모든 화주 및 트럭 사업자.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">2. TADA Truck 사용 방법</span>
              </p>
              <ul className="c9 lst-kix_12xbqgthg0v6-0 start">
                <li className="c0 c10">
                  <span className="c3">
                    화주 : TADA 트럭 고객 웹 사이트에서 배송 세부 정보를
                    입력하여 TADA 트럭 응용 프로그램 패키지를 선택하십시오.
                  </span>
                </li>
                <li className="c2">
                  <span className="c3">
                    트럭 사업자 : TADA 트럭 사업자 웹 사이트에서 원하는 TADA
                    트럭 주문을 선택하십시오.
                  </span>
                </li>
              </ul>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">3. 화주 및 트럭 사업자 요구 사항</span>
              </p>
              <p className="c0">
                <span className="c3">3.1. 화주 </span>
              </p>
              <p className="c0">
                <span className="c3">
                  TADA 트럭 응용 프로그램을 사용하려면 TADA 트럭 (전체 트럭 또는
                  트럭 일부)에 주문을 게시하십시오. TADATruck에 게시된 주문에
                  사실 정보가 포함되어 있지 않음이 감지되면 TADA Truck 플랫폼의
                  화주 계정이 영구적으로 잠기고 법 조항에 따라 TADA Truck 및 /
                  또는 트럭 사업자에게 손해(있는 경우)를 배상합니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  화물 유형, 크기, 사양 및 / 또는 주문에 포함된 화물의 특정
                  특성에 대한 정확하고 완전한 정보를 제공합니다. 운송될 상품은
                  현행법의 규정에 따라 거래 또는 운송 제한 목록에 해당되지
                  않아야 합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">3.2. 트럭 사업자</span>
              </p>
              <p className="c0">
                <span className="c3">
                  TADA 트럭 플랫폼에서 활동하는 동안 TADA 트럭의 이용 약관을
                  준수해야 합니다. TADA Truck의 승인없이 트럭 사업자와 화주 간의
                  별도 계약에서 사고가 발생하는 경우 TADA Truck은 어떠한 책임도
                  지지 않습니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  응용 프로그램 기능을 사용하는 동안 안전 요구 사항을
                  보장합니다.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">4. 기타 조건</span>
              </p>
              <p className="c7">
                <span className="c3">
                  TADATruck 서비스가 변경된 경우 TADATruck은 화주 및 트럭
                  사업자에게 이를 알립니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c7">
                <span className="c1">IV. 소비자의 개인 정보 보호 정책</span>
              </p>
              <p className="c7 c8">
                <span className="c1"></span>
              </p>
              <p className="c0">
                <span className="c3">정보 수집 목적 및 범위</span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c7">
                <span className="c6">
                  TADA Truck 이용자에게 연락, 확인, 혜택을 보장하여 거래를
                  성공적으로 성사시키고 위험을 감소시키기 위해 운송 서비스
                  이용자는 &nbsp;
                </span>
                <span className="c12">www.TADATruck.vn에</span>
                <span className="c3">
                  &nbsp;가입 시, 이름, 주소, 전화 번호, 이메일을 포함한 기본
                  정보를 제공해야 합니다. 운송 서비스 제공 업체는 &nbsp;이름,
                  주소, 전화 번호, 이메일, 운송 서비스 제공 업체와 관련된 문서를
                  포함한 기본 정보를 제공해야 합니다. 이 정보는 전문 화되어
                  시스템에 저장됩니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  등록된 이름, 비밀번호, 이메일 등 서비스를 사용하기 위해
                  사용되는 모든 정보의 비밀 유지 및 저장에 대한 책임은 전적으로
                  이용자에게 있습니다. 또한 회원은 제 3 자가 이름 및 비밀번호를
                  사용하는 것을 방지하고 이에 대한 적절한 해결을 위해
                  &nbsp;www.TADATruck.vn에 무단 사용, 남용, 보안 침해 등을 즉시
                  알릴 책임이 있습니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c7">
                <span className="c3">정보 수집 및 관리 부서 주소</span>
              </p>
              <p className="c11">
                <span className="c5">TADA TECHNOLOGIES COMPANY LIMITED</span>
              </p>
              <p className="c11">
                <span className="c5">
                  주소: No. 37, street no.02, Binh An ward, district 02, HCMC
                </span>
              </p>
              <p className="c11">
                <span className="c5">전화번호: 02836363299</span>
              </p>
              <p className="c11">
                <span className="c5">Email: hotro@tada.global</span>
              </p>
              <p className="c4">
                <span className="c5"></span>
              </p>
              <p className="c0">
                <span className="c3">정보의 사용 범위</span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">정보 수집의 목표는 다음과 같습니다.</span>
              </p>
              <p className="c0">
                <span className="c3">
                  -이용자에게 웹 사이트, 애플리케이션 제공
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  -이용자와 TADA Truck 간의 정보 교환 활동에 대한 알림 전송
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  -이용자 계정을 파괴하는 활동 또는 이용자 스푸핑 활동 방지
                </span>
              </p>
              <p className="c0">
                <span className="c3">-특별한 경우 이용자에게 연락 및 해결</span>
              </p>
              <p className="c7">
                <span className="c3">
                  -이용자의 개인 정보는 www.TADATruck.vn에서의 거래와 관련한
                  확인 및 연락 목적 이외의 용도로 사용하지 않습니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  -법적 요구 사항의 경우 : TADA Truck은 이용자의 개인 정보
                  제공에 협조할 책임이 있습니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  사법 당국에는 이용자의 특정 법률 위반을 조사하는 검찰, 법원,
                  경찰 기관이 포함됩니다. 이 외, 누구도 이용자의 개인 정보를
                  침해할 권리가 없습니다.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">
                  이용자가 자신의 개인 데이터에 액세스하고 편집할 수 있는 수단
                  및 도구
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  이용자는 자신의 계정에 로그인하고 개인 정보를 변경하거나
                  www.TADATruck.vn에 요청하여 개인 정보를 확인, 업데이트, 조정
                  또는 취소할 권리가 있습니다. 이러한 요청 시,
                  www.TADATruck.vn은 정보를 확인하여 회원이 개인 정보의 복구
                  또는 삭제를 지시한 요청에 답변할 책임이 있습니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">정보에 접근 가능한 자</span>
              </p>
              <p className="c7">
                <span className="c3">
                  TADA Truck 및 TADA Truck 관리에서 응용 프로그램을 제공하고
                  사용하는 이용자만이 TADA Truck에 있는 이용자의 개인 정보에
                  액세스할 수 있는 권한이 있으며 법에서 요구하는 경우를 제외하고
                  제 3 자에게 정보를 제공하지 않습니다. 법적으로 이용자의 특정
                  법률 위반을 조사하는 검찰, 법원, 경찰 기관도 이에 포함됩니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">정보 보안에 대한 노력</span>
              </p>
              <p className="c0">
                <span className="c12">www.TADATruck.vn에</span>
                <span className="c3">
                  &nbsp;있는 이용자의 개인 정보는 TADA Truck이 TADA Truck의 개인
                  정보 보호 정책에 따라 기밀을 유지하기 위해 최선을 다하고
                  있으며 법에서 요구하는 경우를 제외하고 제 3 자에게 제공되지
                  않습니다. TADA Truck은 다음과 같은 사법 당국의 요청에 따라
                  개인 회원 정보를 제공하기 위해 협력할 책임이 있습니다:
                  이용자의 특정 법률 위반을 조사하는 검찰, 법원, 경찰 기관.{' '}
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  이 외, 누구도 회원의 개인 정보를 침해할 권리가 없습니다. 각
                  이용자 정보의 수집 및 사용은 법률에 의해 달리 규정되지 않는 한
                  해당 고객의 동의가 있어야만 가능합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">정보 저장 기간</span>
              </p>
              <p className="c0">
                <span className="c3">
                  이용자의 개인 정보는 탈퇴 및 탈퇴를 요청할 때까지 저장됩니다.
                  보관되는 개인 회원 정보는 TADA Truck의 서버에 기밀로
                  유지됩니다.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">
                  고객 개인 정보와 관련된 불만 접수 및 해결 과정
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  이용자는 회사 주소 또는 이메일을 통해 TADA Truck에 개인 정보
                  공개에 대한 의견을 제출할 권리가 있습니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">이메일 : hotro@tada.global</span>
              </p>
              <p className="c0">
                <span className="c3">
                  회사는 반영된 내용을 검증하기 위한 기술적, 전문적 조치를
                  이행할 책임이 있습니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  고객 개인 정보에 대한 반영 기간은 3 영업일입니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">V. 위험 정보 관리</span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c7">
                <span className="c3">
                  등록된 이름, 비밀번호, 이메일 등 서비스를 사용하기 위해
                  사용되는 모든 정보의 비밀 유지 및 저장에 대한 책임은 전적으로
                  이용자에게 있습니다. 또한 회원은 제 3 자가 이름 및 비밀번호를
                  사용하는 것을 방지하고 이에 대한 적절한 해결을 위해
                  &nbsp;www.TADATruck.vn에 무단 사용, 남용, 보안 침해 등을 즉시
                  알릴 책임이 있습니다. 이용자는 불법 및 불합리한 목적, 사기,
                  위협, 불법 정보 탐색, 기물 파손, 시스템을 해치는 부패한
                  바이러스의 생성 및 확산, TADA Truck 정보의 구성, 전송, 추측을
                  목적으로 TADA Truck의 응용 프로그램을 사용하거나 시장 수요
                  조작을 포함하여 가짜 주문 생성을 위한 시장 조작을 위해
                  서비스를 이용하지 않습니다. &nbsp;위반 시 행위에 대한 책임은
                  법령에 의거하여 이용자에게 있습니다. 이용자는 TADA Truck의
                  허락없이 TADA Truck의 응용 프로그램 및 이와 유사한 응용
                  프로그램을 &nbsp;제 3자에게 변경, 수정, 할당, 복사, 배포, 제공
                  및 생성할 수 없습니다. 이용자는 제 3 자 또는 두 번째 등록된
                  이름을 사용하여 어떤 방식으로든 이용자 간의 불화를 유발하는
                  등의 TADA Truck의 신용을 떨어 뜨리는 행위를 해서는 안됩니다.{' '}
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c7">
                <span className="c3">
                  웹 사이트에 게시되지 않은 상품 유형 :
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 군사 무기, 장비, 기술, 군사 장비, 특수 군사 및 경찰 사용
                  수단 군사 장비 (배지, 휘장, 군대 및 경찰의 군사 배지 포함),
                  군대용 군사 장비; 특수 구성 요소, 부품, 예비 부품, 소모품 및
                  장비, 특수 제조 기술.
                </span>
              </p>
              <p className="c0">
                <span className="c3">- 약물 물질.</span>
              </p>
              <p className="c0">
                <span className="c3">
                  - (국제 협약에 따른) 표 1의 화학 물질 .
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 반동적, 타락, 미신적 문화의 산물 또는 미적 및 인성 교육에
                  해로운 제품.
                </span>
              </p>
              <p className="c7">
                <span className="c3">- 폭죽 종류.</span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 위험한 장난감, 어린이의 인성 교육 및 건강, 안전, 사회 질서
                  및 안전을 해치는 장난감 (전자 게임 프로그램 포함).
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 수의법, 식물 보호 및 검역에 관한 조례의 규정에 따라
                  베트남에서 사용이 금지되었거나 허가되지 않은 수의약품 및 식물
                  보호약
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 베트남이 가입한 국제 조약 목록에 야생 동식물 (살아있는 동물
                  및 가공품 포함) 및 착취 및 사용이 금지된 희귀 동식물
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 착취가 금지 된 수산물 및 허가 한도를 초과하는 독성 잔류물이
                  있는 수산물, 인체에 위험한 천연 독소가 함유된 수산물
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  - 베트남에서 허가된 생산, 거래 및 사용 목록에 포함되지 않는
                  비료
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  - 허가된 생산 및 사업 목록에 포함되지 않은 식물 품종; 생산이
                  인간의 건강, 환경 및 생태계에 해를끼치는 식물 품종.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 허가된 생산 및 사업 목록에 없는 가축 품종; 인간의 건강, 가축
                  유전자원, 환경 및 생태계에 해로운 가축 품종
                </span>
              </p>
              <p className="c0">
                <span className="c3">- 특수 및 독성 미네랄.</span>
              </p>
              <p className="c0">
                <span className="c3">- 환경 오염을 유발하는 수입 폐기물</span>
              </p>
              <p className="c7">
                <span className="c3">
                  - 베트남에서 사용이 허가되지 않은 국내 및 의료 분야의 인체용
                  의약품 유형, 백신 유형, 의료용 바이오 제품, 화장품, 화학 물질
                  및 살충제 및 살균제
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 베트남에서 사용이 허가되지 않은 의료 장비 유형.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 식품 첨가물, 식품 가공 보조제, 미량 영양소, 기능성 식품,
                  고위험 식품, 방사선 조사로 보존된 식품, 국가 관할 기관에서
                  허가하지 않은 유전자 변형 식품
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 각섬석 그룹의 석면을 포함하는 제품 및 재료.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">
                  판매 금지, 웹 사이트 게시 금지 서비스 :
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 매춘 거래, 매춘 조직, 여성 및 아동 인신 매매.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  - 어떠한 형태이든 사행성을 조장하는 것, 은 제품
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 국가의 이익, 조직 및 개인의 정당한 권익을 침해하는 비밀 수사
                  서비스
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 이윤 창출을 목적으로 하는 외국 결혼 중개업
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 이윤 창출을 목적으로 외국 자녀 입양 중개 사업 활동.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">
                  운송에 관한 법률에 따른 트럭 사업자의 책임 :
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  면허가 필요한 운송 업종을 위한 위한 사업 면허 소지. 운송업
                  면허 신청 및 운송에 관한 법적 규정 준수.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">VI. 기술적 오류 발생 시 책임</span>
              </p>
              <p className="c0 c8">
                <span className="c1"></span>
              </p>
              <p className="c7">
                <span className="c3">
                  TADA Truck은 전체 기술 시스템의 안전과 안정성을 보장하기 위해
                  노력합니다. 단, TADA Truck으로 인한 오류 발생 시 TADA Truck은
                  즉시 이용자에게 &nbsp;조치를 취합니다. 현장에서 거래를 수행할
                  때 이용자는 반드시 지침을 준수해야 합니다. TADA Truck은
                  이용자에게 좋은 경험을 제공하기 위해 최선을 다하고 있습니다.
                  기술적 오류, 소프트웨어 오류 또는 기타 객관적인 오류가
                  발생하여 이용자가 프로세스에 참여할 수 없는 경우,
                  &nbsp;이용자는 고객 지원 부서 이메일 주소
                  (hotro@tada.global)를 통해 TADA Truck에 알립니다. TADA Truck은
                  신속하게 오류를 수정하여 이용자가 TADA Truck 플랫폼에 참여할
                  수 있도록 합니다. 단, TADA Truck으로 인해 발생하지 않은 기술적
                  오류 및 전송 오류, 소프트웨어 또는 기타 오류로 인해 이용자의
                  통지가 TADA Truck에 도달하지 못한 경우 TADA Truck은 책임을
                  지지 않습니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">
                  VII. TADATruck TADA Truck의 권리와 책임
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">권리</span>
              </p>
              <p className="c7">
                <span className="c3">
                  - www.TADATruck.com에 존재하는 모든 지적 재산권은 (주) 타다
                  테크놀로지가 소유하므로 (주) 타다 테크놀로지에 모든 법적
                  권리가 보장됩니다. TADA Truck은 TADA Truck의 규정을 심각하게
                  위반한 이용자의 정보를 추가, 수정, 삭제 또는 계정을 삭제할 수
                  있으며, 모든 항목을 포함하여 이 웹 사이트의 인터페이스, 기능
                  및 내용을 예고없이 변경할 수 있습니다. TADA Truck의 동의가
                  없는 한 이용자는 웹 사이트의 어떤 구성 요소도 업로드, 전송,
                  게시, 복제, 전송 또는 배포하거나 TADA Truck에서 제공하는
                  콘텐츠의 수정본을 만들 수 없습니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">책임</span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 웹 사이트가 안정적으로 운영될 수 있는 조건을 갖추고 시스템
                  오류 발생 시 이용자에게 알리며 신속하게 오류를 수정해야
                  합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 법령에 의거, 영업이 금지된 재화 및 용역 목록 및 영업이
                  제한된 재화 등의 서비스 정보를 웹 사이트에서 차단 및
                  제거합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 위조, 위조품, 밀수품, 지적 재산권을 침해하는 상품, 기타
                  법규를 위반하는 상품 및 서비스에 대한 정보를 알게 되었을 때 이
                  정보를 웹 사이트에서 제거합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 웹 사이트의 조건에 따라 상품 / 서비스 목록에 정보 및
                  서비스를 게시하도록 요청하는 경우 해당 상품 / 서비스에 대한
                  영업 자격 증명서를 제공해야 합니다 (법에 따라 영업 자격
                  증명서가 필요한 경우).
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 서비스 제공자의 내용 중 하나라도 변경이 있는 경우에는 변경
                  사항을 적용하기 최소 5 일 전에 웹 사이트의 모든 이용자에게
                  고지해야 합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 웹 사이트에서 서비스 제공자인 단체 및 개인에게 개인 또는
                  단체의 본사 이름과 주소 또는 개인의 이름과 영구 주소에 대한
                  정보를 제공하도록 요청합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 웹 사이트에 판매자의 정보를 정확하고 완전하게 제공할 수
                  있도록 점검 및 감독하는 메커니즘을 보유합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 웹 사이트에 참여하는 단체 및 개인의 등록 정보를 저장하고
                  관련 변경 사항 및 추가 정보를 정기적으로 업데이트합니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  - 조직, 개인의 영업 비밀, 소비자의 개인 정보와 관련된 정보의
                  안전성 확보를 위해 필요한 조치를 취합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 전자 상거래 거래소에서 영업법 위반 행위를 적발하거나 적시에
                  대응할 수 있도록 조치합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 법규 위반 행위 조사에 있어 국가 관리 기관을 지원하고, 전자
                  상거래 상의 법 위반 사항에 대한 등록 정보, 거래 내역 및 기타
                  문서를 제공합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 거래 과정에서 발생하는 분쟁 해결 메커니즘을 홈페이지에
                  공개합니다.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">
                  VIII. TADA Truck 플랫폼 이용자의 권리와 책임
                </span>
              </p>
              <p className="c0 c8">
                <span className="c1"></span>
              </p>
              <p className="c0">
                <span className="c6">화주</span>
                <span className="c3">&nbsp;이용자의 권리와 책임</span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">권리</span>
              </p>
              <p className="c0">
                <span className="c6">
                  - TADA Truck 회원 가입, TADA Truck 약관 및 규정 동의, 계정
                  활성화 후, 이용자는{' '}
                </span>
                <span className="c12">www.TADATruck.vn</span>
                <span className="c6">
                  &nbsp;에서 서비스를 이용할 수 있습니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 각 이용자에게는 TADA Truck을 통해 판매 및 주문 관리를 할 때
                  사용할 수 있는 고유한 이용자 이름과 비밀번호가 제공됩니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 이용자는 TADA Truck에서 주문 생성, 주문 관리 및 기타 응용
                  프로그램 사용을 위한 도구 및 기능을 사용할 수 있습니다.
                </span>
              </p>
              <p className="c0">
                <span className="c6">
                  - 이용자는 응용 프로그램 이용 중 TADA Truck에 의견을 남길
                  권리가 있습니다.{' '}
                </span>
                <span className="c6 c15">
                  각 의견은 우편, 전화, 이메일 또는 기타 법에 반하지 않는 채널을
                  통해 응용 프로그램 제공 업체에 직접 전송됩니다.
                </span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">책임</span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 서비스 이용 등록 시 웹 사이트에서 서비스를 제공하는 개인 및
                  단체에 대해 완전하고 정확한 정보를 제공합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - www.TADATruck.vn에 니즈를 게시하거나 서비스를 제공할 때 상품
                  / 서비스에 대한 전체 정보를 제공합니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  - www.TADATruck.vn에서 제공하는 서비스에 대한 정보 제공 시
                  정보의 정확성과 진실성을 보장합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 통계 활동을 제공하기 위해 관할 국가 기관의 요청에 따라
                  비즈니스 상황에 대한 정보를 제공합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 법령 59/2015 / ND-CP 등 제한 및 금지 사업 목록에 상품 /
                  서비스에 대한 정보를 게시하지 않습니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  - 법에 따라 납세 의무를 철저히 준수합니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c3">트럭 사업자의 권리와 책임</span>
              </p>
              <p className="c0 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">권리</span>
              </p>
              <p className="c0">
                <span className="c6">
                  - TADA Truck 회원 가입, TADA Truck 약관 및 규정 동의, 계정
                  활성화 후, 이용자는{' '}
                </span>
                <span className="c12">www.TADATruck.vn에서</span>
                <span className="c3">&nbsp;서비스를 이용할 수 있습니다.</span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 각 회원에게는 TADATruck을 통해 판매 및 주문 관리를 할 때
                  사용할 고유한 이용자 이름과 비밀번호가 부여됩니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 이용자는 TADA Truck에서 주문 생성, 주문 관리 및 기타 응용
                  프로그램 사용을 위한 도구 및 기능을 사용할 수 있습니다.
                </span>
              </p>
              <p className="c7">
                <span className="c6">
                  - 이용자는 응용 프로그램 이용 중 TADA Truck에 의견을 남길
                  권리가 있습니다.{' '}
                </span>
                <span className="c6 c15">
                  각 의견은 우편, 전화, 이메일 또는 기타 법에 반하지 않는 채널을
                  통해 응용 프로그램 제공 업체에 직접 전송됩니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">책임</span>
              </p>
              <p className="c0">
                <span className="c3">
                  운송 서비스 제공 업체는 다음과 같은 화물 자동차 규정을
                  준수하는 것 외에도 위에서 언급한 운송 서비스 이용자와 동일한
                  책임을 수행해야 합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 위험물 운송 사업은 운송 시 인명, 건강, 환경, 안전 및 국가
                  안보에 해를 끼칠 수있는 위험 물질이 포함된 물품을 운송하기
                  위해 자동차를 사용하는 것입니다. 위험물 운송에는 관할 기관에서
                  부여한 위험물 운송 허가가 있어야 합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 컨테이너로 물품을 운송하는 사업은 트레일러를 견인하는
                  트랙터, 세미 트레일러를 사용하여 컨테이너를 운송하는 것입니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 일반화물 운송업은 다른 형태의 운송업에 추가된 화물 운송업의
                  한 형태입니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  - 화물 운송 사업부는 교통부 규정에 따라 차량에 물품을 실을
                  책임이 있습니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  - 성급 인민위원회는 해당 지역의 자동차 터미널 및 물품 배송 및
                  수령 지점에 대한 계획을 수립하고 발표해야 합니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">IX. 당사자 간의 책임 구분</span>
              </p>
              <p className="c0 c8">
                <span className="c1"></span>
              </p>
              <p className="c0">
                <span className="c3">
                  TADA Truck의 거래 과정에서 발생하는 분쟁은 당사자가 협상할
                  것이며, 해결할 수 없는 경우 법에 따라 관할 당국에 의해
                  해결되어야 합니다. 과실이 트럭 사업자 (서비스 제공 업체)에
                  속하는 경우 트럭 사업자는 화주(서비스 이용자)에게 손해를
                  보상할 책임이 있습니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  TADA Truck은 제 3 자로서만 불만을 접수하고 관련 정보를
                  제공합니다. 분쟁 해결 지원 절차는 다음과 같습니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  -1 단계 : 화주 (운송 서비스 이용자)이용자가 트럭 사업자(운송
                  서비스 제공 업체)의 서비스에 대해 불만을 제기
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  -2 단계 : TADA Truck의 고객 지원 부서는 불만의 성격과 정도에
                  따라 불만을 접수합니다. TADA Truck은 이용자가 분쟁을
                  해결하도록 지원하기 위한 구체적인 조치를 취합니다.
                </span>
              </p>
              <p className="c0">
                <span className="c3">
                  -3 단계 : TADA Truck은 이용자가 분쟁 해결에 동의할 수 있도록
                  정보를 수집하고 양 당사자에게 전달합니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  -4 단계 : TADA Truck의 능력을 벗어난 범위의 사건은 법에 따라
                  해결하기 위해 관할 주정부 기관에 전달됩니다.
                </span>
              </p>
              <p className="c7 c8">
                <span className="c3"></span>
              </p>
              <p className="c0">
                <span className="c1">적용 가능한 용어</span>
              </p>
              <p className="c0 c8">
                <span className="c1"></span>
              </p>
              <p className="c0">
                <span className="c3">
                  TADA 트럭 규정은 웹 사이트 www.TADATruck.vn에 게시된 날부터
                  유효합니다.
                </span>
              </p>
              <p className="c7">
                <span className="c3">
                  웹 사이트의 목적과 운영을 보장하기 위해 규정 내용을 변경하는
                  경우 경영 이사회는 웹 사이트에 공지합니다. 수정된 규정은 규정
                  수정 결정 발효일부터 효력이 발생합니다. 개정된 규정이 시행된
                  후에도 회원이 서비스를 계속 이용한다는 것은 개정된 규정에
                  동의함을 의미합니다.
                </span>
              </p>
              <p className="c8 c13">
                <span className="c5"></span>
              </p>
            </>
          ) : (
            <>
              <h5 className="c6" id="h.as0gkmv79cbj">
                <span className="c7">I. General principles</span>
              </h5>
              <p className="c4">
                <span className="c10">www.TADATruck.vn</span>
                <span className="c2">
                  &nbsp;is a website that provides connection and information
                  exchange services between people who need goods and who need
                  trucks by TADA Vietnam. (hereinafter referred to as TADA
                  Truck).
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Service form is to provide a connection function between the
                  person who needs to deliver goods and the logistics company.
                </span>
              </p>
              <p className="c4">
                <span className="c10">
                  This principle applies to registered users and provides
                  transport services on www.TADATruck.vn. Traders, organizations
                  and individuals participating in{' '}
                </span>
                <span className="c13 c16">
                  <a
                    className="c1"
                    href="https://www.google.com/url?q=http://www.tadatruck.vn&amp;sa=D&amp;ust=1606297083292000&amp;usg=AOvVaw3n9oSh2V-Hf4exAk198mld"
                  >
                    www.TADATruck.vn
                  </a>
                </span>
                <span className="c10">. TADA</span>
                <span className="c2">
                  &nbsp;Truck are free to agree on the basis of respecting the
                  legitimate rights and interests of the parties to use and
                  providing services through contracts, not contrary to legal
                  regulations.
                </span>
              </p>
              <h5 className="c6" id="h.89v3ykscqhm4">
                <span className="c7">II. General rules</span>
              </h5>
              <p className="c4">
                <span className="c2">1. Web</span>
              </p>
              <p className="c4">
                <span className="c2">Website name: TADA Truck</span>
              </p>
              <p className="c4">
                <span className="c2">Domain name: www.TADATruck.vn</span>
              </p>
              <p className="c4">
                <span className="c2">2. Definition</span>
              </p>
              <ul className="c5 lst-kix_u4k2ed4wk94n-0 start">
                <li className="c3">
                  <span className="c2">
                    Order: Is information of goods posted by a Good Owner.
                  </span>
                </li>
                <li className="c3">
                  <span className="c2">
                    Good Owner: Is the person who posted the request to
                    transport goods, which may be the owner of the goods or the
                    representative.
                  </span>
                </li>
                <li className="c3">
                  <span className="c2">
                    Truck Owner: A person who views the order information, is
                    able to carry out shipping requests for the Good Owner. He
                    may own a transport vehicle or be an authorized
                    representative.
                  </span>
                </li>
                <li className="c3">
                  <span className="c2">
                    Notice: is the notice of TADA Truck relating to the use of
                    the system, introduction and promotion of trading
                    activities, information between Good Owner and Truck Owners
                    (if any)
                  </span>
                </li>
                <li className="c3">
                  <span className="c10">
                    User: including Good Owner (transport service users) and
                    Truck owners (transport service providers).
                  </span>
                  <span className="c10">&nbsp;Users</span>
                  <span className="c2">
                    &nbsp;of TADA Truck are traders, organizations and
                    individuals having demand to provide or use services on the
                    website. Registered users declare relevant personal
                    information, officially recognized by TADA Truck and allowed
                    to use the service on www.TADATruck.vn
                  </span>
                </li>
                <li className="c3">
                  <span className="c2">
                    When registering as a user of TADA Truck, users understand
                    that:
                  </span>
                </li>
              </ul>
              <p className="c4">
                <span className="c2">
                  + Users can create a personal account to use.
                </span>
              </p>
              <p className="c4">
                <span className="c10">
                  + Users can use the information and{' '}
                </span>
                <span className="c10">utility functions</span>
                <span className="c2">&nbsp;provided on www.TADATruck.vn</span>
              </p>
              <p className="c4">
                <span className="c2">
                  The content of this Regulation complies with the current
                  provisions of Vietnamese law. Users participating in
                  www.TADATruck.vn must find out their legal responsibility for
                  the current laws of Vietnam and commit to comply with the
                  contents of this Regulation.
                </span>
              </p>
              <h5 className="c6" id="h.wkfqlin5klsg">
                <span className="c7">III. Utility of Trucking - TADATruck</span>
              </h5>
              <p className="c4">
                <span className="c2">1. TADA Truck&rsquo;s target users</span>
              </p>
              <p className="c4">
                <span className="c2">
                  All Good Owners and Truck Owners who have authenticated
                  accounts on TADA Truck platform and have not violated any
                  terms and conditions in the process of registering and
                  transporting goods through the TADA Truck applications.
                </span>
              </p>
              <p className="c4">
                <span className="c2">2. How to use TADA Truck</span>
              </p>
              <ul className="c5 lst-kix_mjijnmy2qyjb-0 start">
                <li className="c3">
                  <span className="c2">
                    Good Owner: Select the TADA Truck utility package by filling
                    in the shipment details on the TADA Truck Customer website.
                  </span>
                </li>
                <li className="c3">
                  <span className="c2">
                    Truck Owner: Select the TADA Truck order that matches your
                    preference on the TADA Truck Truck Owners website.
                  </span>
                </li>
              </ul>
              <p className="c4">
                <span className="c2">
                  3. Good Owner and Truck Owner Requirements
                </span>
              </p>
              <p className="c4">
                <span className="c2">3.1. For Good Owner</span>
              </p>
              <p className="c4">
                <span className="c2">
                  Post an order on TADA Truck (either full truckload or
                  less-than-truckload) to use TADA Truck utilities. If TADATruck
                  detects the posted order doesn&rsquo;t contain factual
                  information, the Good Owner account on the TADA Truck platform
                  will be permanently locked and will pay damages (if any) to
                  TADA Truck and/or the Truck Owners in accordance with the
                  provisions of law.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Provide accurate and complete information about the cargo
                  type, size, specifications and / or any specific
                  characteristics of the cargo shipped in the order. Transported
                  goods needs not to be on the restricted list to trade or
                  transport under the provisions of the current law.
                </span>
              </p>
              <p className="c4">
                <span className="c2">3.2. For Truck Owners</span>
              </p>
              <ul className="c5 lst-kix_h9lx0xiapsto-0 start">
                <li className="c3">
                  <span className="c2">
                    Must comply with Terms and Conditions of TADA Truck while
                    being active on TADA Truck platform. If any incidents occur
                    from a separate agreement between the Truck Owners and the
                    Good Owner without TADA Truck&rsquo;s acknowledgement, TADA
                    Truck shall not be liable for any liability.
                  </span>
                </li>
                <li className="c3">
                  <span className="c2">
                    Ensuring health safety requirements during using utility
                    functions.
                  </span>
                </li>
              </ul>
              <p className="c4">
                <span className="c2">4. Other conditions</span>
              </p>
              <ul className="c5 lst-kix_p73ztcr9cedw-0 start">
                <li className="c3">
                  <span className="c2">
                    TADATruck will update to Good Owners and Truck Owners in
                    case of any changes to the TADATruck service pack.
                  </span>
                </li>
              </ul>
              <h5 className="c6" id="h.3sduhyl0ria7">
                <span className="c7">
                  IV. Policy to protect personal information of consumers
                </span>
              </h5>
              <p className="c4">
                <span className="c2">
                  Purpose and scope of information collection
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  To ensure that transactions made successfully and reduce risk
                  can arise and to contact, confirm, guarantee benefits for
                  Users on TADA Truck, when registering to use www.TADATruck.vn,
                  transportation service users must provide initial information
                  including: name, address, phone number, email. For transport
                  service providers, they must provide initial information
                  including: name, address, phone number, email, documents
                  relating to the transport service provider&hellip; This
                  information will be expertised and stored in the system.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Users shall be solely responsible for the confidentiality and
                  storage of all use of the service under their registered name,
                  password and email box. In addition, the member is responsible
                  for promptly notifying www.TADATruck.vn of unauthorized use,
                  abuse, security breaches, keeping the third party&#39;s
                  registration name and password for suitable solutions.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Address of information collection and management unit
                </span>
              </p>
              <p className="c4">
                <span className="c12">TADA TECHNOLOGIES COMPANY LIMITED</span>
              </p>
              <p className="c4">
                <span className="c13">Address: </span>
                <span className="c13">
                  No. 37, street no.02, Binh An ward, district 02, HCMC
                </span>
              </p>
              <p className="c4">
                <span className="c13">Phone: </span>
                <span className="c13">02836363299</span>
              </p>
              <p className="c4">
                <span className="c13">Email: hotro@tada.global</span>
              </p>
              <p className="c4">
                <span className="c2">Scope of use of information</span>
              </p>
              <p className="c4">
                <span className="c2">Information gathering aims to:</span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Providing website, application to Users;
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Send notifications about information exchange activities
                  between Users and TADA Truck
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Prevent activities that destroy a User account or User
                  spoofing activities;
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Contact and solve with Users in special cases.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Do not use personal information of Users other than the
                  purpose of confirmation and contact related to transactions at
                  www.TADATruck.vn
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - In case of legal requirement: TADA Truck is responsible for
                  cooperating to provide personal information of Users when
                  requested from
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Judicial authorities include: Procuracies, courts, police
                  agencies investigating certain law violations of Users. In
                  addition, no one has the right to violate the User&#39;s
                  personal information.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Means and tools for Users to access and edit their personal
                  data.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Users have the right to self-check, update, adjust or cancel
                  their personal information by logging in to their account and
                  editing personal information or requesting www.TADATruck.vn to
                  do this. Upon receiving these responses, www.TADATruck.vn will
                  confirm the information, be responsible for answering the
                  reason and instructing the member to recover or delete
                  personal information.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  People who have access to information
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Only Users who provide and use utilities on TADA Truck and
                  TADA Truck management have the right to access the user&#39;s
                  personal information on TADA Truck, and the information is not
                  provided to third parties unless required. Laws include:
                  Procuratorate, court, police agency investigating certain law
                  violations of Users.
                </span>
              </p>
              <p className="c4">
                <span className="c2">Commitment to information security</span>
              </p>
              <p className="c4">
                <span className="c2">
                  Personal information of Users on www.TADATruck.vn is committed
                  by TADA Truck to absolute confidentiality under TADA
                  Truck&#39;s personal information protection policy and is not
                  provided to third parties, except as required by law. TADA
                  Truck is responsible for cooperating to provide personal
                  member information upon request from judicial authorities
                  including:
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Procurator, court, police agency investigating violations of
                  certain laws of Users. In addition, no one has the right to
                  violate the member&#39;s personal information. The collection
                  and use of each User&#39;s information is only possible with
                  the consent of that customer unless otherwise provided by law.
                </span>
              </p>
              <p className="c4">
                <span className="c2">Time to store information</span>
              </p>
              <p className="c4">
                <span className="c2">
                  Personal data of Users will be stored until requested to
                  cancel or self-login and cancel. Remaining in all cases
                  personal member information will be kept confidential on the
                  server of TADA Truck.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Mechanism for receiving and resolving complaints related to
                  personal customer information
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Users have the right to submit feedback about disclosure of
                  personal information to third parties to TADA Truck via the
                  Company address or email.
                </span>
              </p>
              <p className="c4">
                <span className="c12">Email: hotro@tada.global</span>
              </p>
              <p className="c4">
                <span className="c2">
                  The company is responsible for implementing technical and
                  professional measures to verify the reflected content.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  The period of time for reflection relating to personal
                  customer information is 03 working days
                </span>
              </p>
              <h5 className="c6" id="h.nss5197jn8np">
                <span className="c7">V. Hazard information management</span>
              </h5>
              <p className="c4">
                <span className="c10">Users</span>
                <span className="c2">
                  &nbsp;will be solely responsible for the confidentiality and
                  storage of all uses of the service under their registered
                  names and passwords. The member is responsible for promptly
                  notifying TADA Truck of unauthorized use, abuse, security
                  breaches, keeping the third party&#39;s registration name and
                  password for resolution. fit. Users do not use utilities of
                  TADA Truck for illegal, unreasonable purposes, frauds,
                  threats, illegal information exploration, vandalism, creation
                  and spread of corrupt viruses harming the system, configuring,
                  transmitting information of TADA Truck or using its services
                  for the purpose of speculation and market manipulation to
                  create fake orders and offers, including for judging market
                  demand. In case of violation, the member shall be responsible
                  for his / her acts before the law. Users may not alter,
                  modify, assign, copy, disseminate, distribute, provide and
                  create similar tools provided by TADA Truck to a third party
                  without permission. Users must not act to discredit TADA Truck
                  in any way, such as causing disunity among Users by using a
                  second registered name, through a third party or propaganda,
                  spectrum. Turning information is not conducive to the
                  reputation of TADA Truck.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Types of goods not posted on the website:
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Military weapons, equipment, techniques, military equipment,
                  specialized means of military and police use; military
                  equipment (including badges, insignia, military badges of the
                  army and police), military equipment for the armed forces;
                  Special components, parts, spare parts, supplies and
                  equipment, specialized technologies for manufacturing them.
                </span>
              </p>
              <p className="c4">
                <span className="c2">- Drug substances.</span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Chemicals in Table 1 (according to the International
                  Convention).
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Products of reactionary, depraved, superstitious culture or
                  harmful to aesthetic and personality education.
                </span>
              </p>
              <p className="c4">
                <span className="c2">- Types of firecrackers.</span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Dangerous toys, toys harmful to the personality education
                  and health of children or to security, social order and safety
                  (including electronic game programs).
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Veterinary drugs and plant protection drugs banned or not
                  yet permitted for use in Vietnam according to the provisions
                  of the Veterinary Ordinance, the Ordinance on Plant Protection
                  and Quarantine.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Wild plants and animals (including live animals and
                  processed parts) on the list of international treaties to
                  which Vietnam is a member and various rare and precious plants
                  and animals on the list. Prohibit exploitation and use.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Aquatic products banned from exploitation and aquatic
                  products with toxic residues exceeding permitted limits, and
                  aquatic products with natural toxins which are dangerous to
                  human life.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Fertilizers are not included in the list of permitted
                  production, trading and use in Vietnam.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Plant varieties not included in the list of permitted
                  production and business; plant varieties cause harm to
                  production and human health, environment and ecosystems.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Livestock breeds not on the list of permitted production and
                  business; Livestock breeds are harmful to human health,
                  livestock gene sources, environment and ecosystems.
                </span>
              </p>
              <p className="c4">
                <span className="c2">- Special and toxic minerals.</span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Imported waste causing pollution to the environment.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Types of medicines for human use, types of vaccines, medical
                  bio-products, cosmetics, chemicals and insecticidal and
                  germicidal preparations in the domestic and medical domains,
                  which are not yet permitted for use in Vietnam.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Types of medical equipment not yet permitted for use in
                  Vietnam.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Food additives, food processing aids, micronutrients,
                  functional foods, high-risk foods, food preserved by
                  irradiation, genetically modified food not yet permitted by
                  competent state agencies
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Products and materials containing asbestos of amphibole
                  groups.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Services banned from sale, banned from posting on the website:
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Trading in prostitution, organizing prostitution,
                  trafficking in women and children.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Organizing gambling, silverware in any form.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Secret investigation services infringing upon the interests
                  of the state, legitimate rights and interests of organizations
                  and individuals.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Marriage brokerage business with foreign elements aimed at
                  making profits.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Brokerage business activities to receive fathers, mothers
                  and children, and adopt children with foreign elements in
                  order to make a profit.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Responsibilities of Truck owners according to the law on
                  transportation:
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  Having a business license for transportation by car for
                  business types requiring a license. Application for a trucking
                  business license and complying with legal regulations on
                  transportation.
                </span>
              </p>
              <h5 className="c6" id="h.91zmvalgmwe3">
                <span className="c7">
                  VI. Responsibility in case of technical error arises
                </span>
              </h5>
              <p className="c4">
                <span className="c10">TADA Truck</span>
                <span className="c2">
                  &nbsp;is committed to making efforts to ensure the safety and
                  stability of the entire technical system. However, in the
                  event of a fault caused by TADA Truck, TADA Truck will
                  immediately apply measures to ensure benefits for Users. When
                  performing transactions on the floor, it is imperative that
                  the Users comply with the instructions. TADA Truck is
                  committed to providing a good experience for users. If a
                  technical error, software error or other objective error
                  arises, Users cannot participate in the process, the Users
                  notify TADA Truck via email address: hotro@tada.global, we
                  will fix the error as soon as possible, enabling Users to
                  participate in TADA Truck platform. However, TADA Truck will
                  not be responsible for resolving in case the notice of Users
                  does not reach TADA Truck, arising from technical errors,
                  transmission errors, software or other errors not caused by
                  TADA Truck.
                </span>
              </p>
              <h5 className="c6" id="h.osjcj7gje9xm">
                <span className="c11">
                  VII. Rights and responsibilities of TADATruck{' '}
                </span>
                <span className="c10 c15">TADA Truck</span>
              </h5>
              <h5 className="c6" id="h.hpcelcsh7jo4">
                <span className="c7">Right</span>
              </h5>
              <p className="c4">
                <span className="c2">
                  - All intellectual property rights that exist on
                  www.TADATruck.com are owned by TADA Technology Co., Ltd.
                  Accordingly, all legal rights are guaranteed. TADA Truck
                  reserves the right to add, modify, delete any information, or
                  delete accounts for Users who seriously violate the
                  regulations of TADA Truck as well as change the interface,
                  functions and contents of this website including any item
                  without notice. Unless having the consent from TADA Truck,
                  Users are not allowed to upload, send, publish, reproduce,
                  transmit or distribute in any way any component of the website
                  or create revisions. of content provided in TADA Truck.
                </span>
              </p>
              <h5 className="c6" id="h.mpem2z4whska">
                <span className="c7">Responsibility</span>
              </h5>
              <p className="c4">
                <span className="c2">
                  - Ensure conditions for the website to operate stably, in case
                  of system error, it should inform the Users and quickly fix
                  the error.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Prevent and remove from the website the service information
                  on the list of goods and services banned from business in
                  accordance with the law and goods restricted from business.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Remove from the website the information of counterfeit,
                  counterfeit goods, smuggled goods, goods infringing
                  intellectual property rights and other goods and services that
                  violate the law when detecting or receiving a valid
                  determination real about this information.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Requesting people to post information and services on the
                  list of goods / services subject to conditions on their
                  website must provide a certificate of business eligibility for
                  such goods / services (in case The law requires a certificate
                  of business eligibility).
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - When there is a change in one of the contents of the service
                  provider, must notify all users of the website at least 5 days
                  before applying those changes.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Request organizations and individuals who are service
                  providers on the website to provide information on the name
                  and address of the head office of the individual or
                  organization or the name and permanent address of the
                  individual.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - There is a mechanism for inspection and supervision to
                  ensure the supply of information of the seller on the website
                  is done accurately and completely.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Store registration information of organizations and
                  individuals participating in the website and regularly update
                  relevant changes and additional information.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Apply necessary measures to ensure the safety of information
                  related to business secrets of organizations, individuals and
                  personal information of consumers.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Take measures to handle in time when detecting or receiving
                  reflections on acts of violating business law on the
                  e-commerce trading floor.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Supporting state management agencies in investigating acts
                  of law violations, providing registration information,
                  transaction history and other documents on subjects of law
                  violation on the delivery floor e-commerce translation.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Publicize the mechanism to resolve disputes arising in the
                  transaction process on the website.
                </span>
              </p>
              <h5 className="c6" id="h.pwwcpsiajyx7">
                <span className="c7">
                  VIII. Rights and responsibilities of Users on TADA Truck
                  platform
                </span>
              </h5>
              <p className="c4">
                <span className="c2">
                  Rights and responsibilities for Users who are goods owners
                </span>
              </p>
              <h5 className="c6" id="h.abn2ndlnzd8m">
                <span className="c7">Right</span>
              </h5>
              <p className="c4">
                <span className="c2">
                  - When registering to become a user of TADA Truck and agreed
                  by TADA Truck and activating the account, the user will be
                  traded on www.TADATruck.vn
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Each user will be given a unique username and password to
                  use in making sales and management orders via TADA Truck
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Users will be instructed to use the tools and features for
                  conducting orders, managing orders and using other utilities
                  on TADA Truck
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Users have the right to contribute comments to TADA Truck
                  during the operation. Proposals sent directly by mail, fax,
                  phone, email or other channels that are not contrary to TADA
                  Truck
                </span>
              </p>
              <h5 className="c6" id="h.4i2vu4vt8no7">
                <span className="c7">Responsibility</span>
              </h5>
              <p className="c4">
                <span className="c2">
                  - Provide full and accurate information for individuals and
                  organizations providing services on the website when
                  registering to use the service.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Provide full information on goods/services when posting
                  needs or providing services on www.TADATruck.vn
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Ensure the accuracy and truthfulness of information on goods
                  and services provided on www.TADATruck.vn
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Provide information about their business situation at the
                  request of competent state agencies to serve statistics
                  activities.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Do not post information about goods/services on the list of
                  restricted and banned businesses such as Decree 59/2015 /
                  ND-CP
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Fully comply with tax obligations in accordance with the
                  law.
                </span>
              </p>
              <h5 className="c6" id="h.ypnzad7lls4l">
                <span className="c7">
                  Rights and responsibilities of Truck owners
                </span>
              </h5>
              <h5 className="c6" id="h.c3wr8kkld7y">
                <span className="c7">Right</span>
              </h5>
              <p className="c4">
                <span className="c2">
                  - When registering to become a user of TADA Truck and agreed
                  by TADA Truck and activating the account, the member will be
                  active on www.TADATruck.vn
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Each member will be given a unique username and password to
                  use in making sales and management orders via TADATruck
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Users will be instructed to use the tools and features for
                  conducting orders, managing orders and using other utilities
                  on TADA Truck
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Users have the right to contribute comments to TADA Truck
                  during the operation. Proposals sent directly by mail, fax,
                  phone, email or other channels that are not contrary to TADA
                  Truck
                </span>
              </p>
              <h5 className="c6" id="h.ueklxzbz049d">
                <span className="c7">Responsibility</span>
              </h5>
              <p className="c4">
                <span className="c2">
                  Transport service providers must perform the same
                  responsibilities as the Transport Service Users mentioned
                  above, in addition to complying with the regulations on
                  freight cars as follows:
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Business of transporting dangerous goods is the use of cars
                  to transport goods containing dangerous substances when
                  transporting may cause harm to human life, health,
                  environment, safety and National security. Transporting
                  dangerous goods must have dangerous goods transport permits
                  granted by competent agencies.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Business of goods transport by container is the use of
                  tractors pulling trailers, semi-trailers to transport
                  containers.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Ordinary cargo transportation business is a form of cargo
                  transport business in addition to other forms of transport
                  business.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - The cargo transport business unit is responsible for placing
                  goods on cars according to the regulations of the Ministry of
                  Transport.
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Provincial-level People&#39;s Committees shall formulate and
                  announce plannings on car terminals and goods delivery and
                  receipt points in their localities.
                </span>
              </p>
              <h5 className="c6" id="h.enem66cnaew2">
                <span className="c7">
                  IX. Identify responsibilities between parties
                </span>
              </h5>
              <p className="c4">
                <span className="c2">
                  Disputes arising during the transaction process on TADA Truck
                  will be negotiated by the parties, in case it cannot be
                  solved, it should be resolved by the competent authority in
                  accordance with the law. If the error belongs to the Truck
                  Owner (Service Provider), the owner must be responsible for
                  compensating the Good Owner (Service User).
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  TADA Truck only acts as a third party to receive complaints
                  and provide relevant information. The process of supporting
                  dispute settlement is as follows:
                </span>
              </p>
              <p className="c4">
                <span className="c10">
                  - Step 1: Users as the goods owner (transport service user)
                  complain about the service of the Truck Owner (transport
                  service provider){' '}
                </span>
              </p>
              <p className="c4">
                <span className="c2">
                  - Step 2: The Customer Support Department of TAD Truck will
                  receive complaints, depending on the nature and extent of the
                  complaint, TADA Truck will have specific measures to support
                  the Users to resolve paintings
                </span>
              </p>
              <p className="c4">
                <span className="c10">
                  - Step 3: TADA Truck will collect and transfer information to
                  both parties so that
                </span>
                <span className="c0">&nbsp;both sides of users </span>
                <span className="c2">can agree on the dispute settlement.</span>
              </p>
              <p className="c4">
                <span className="c10">
                  - Step 4: In the school outside the ability and competence of
                  TADA Truck, the case will be brought to the competent state
                  agency to settle under the law.
                </span>
              </p>
              <h5 className="c6" id="h.a4i6u8x5gy9m">
                <span className="c7">APPLICABLE TERMS</span>
              </h5>
              <p className="c4">
                <span className="c10">TADA Truck</span>
                <span className="c2">
                  &nbsp;regulations are effective from the date of posting on
                  the website www.TADATruck.vn
                </span>
              </p>
              <p className="c4">
                <span className="c10">
                  In case of changing the content of the regulation to ensure
                  the purpose and operation of the website, the Management Board
                  will announce it on the website. The amended Regulation takes
                  effect from the effective date of the Decision on the
                  amendment of the Regulation. The continued use of the service
                  by the member after the revised Regulation has been
                  implemented and implemented means that this revised Regulation
                  has been accepted.
                </span>
              </p>
            </>
          )}
        </StaticContent>
      </WrapperTheme>
    </>
  );
};

export default observer(TermsConditionsPage);
