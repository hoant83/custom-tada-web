import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import AccordionContent from '@/modules/cms/components/AccordionContent';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { LanguageStoreContext } from '@/modules/lang/lang.store';

const FaqTruckOwnerPage = () => {
  const langStore = React.useContext(LanguageStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { TOPMENU_FAQ } = I18N;

  const data = [
    {
      title: 'TADA truck hoạt động như thế nào?',
      content:
        '<p>TADA Truck là nền tảng công nghệ kết nối các chủ xe/ tài xế xe tải và chủ hàng. Chúng tôi hoạt động với mong muốn mang đến cho các chủ xe/ tài xế xe tải thêm kênh tiếp cận các khách hàng tiềm năng, gia tăng thu nhập. Bạn sẽ nhận được các yêu cầu vận tải và kết nối trực tiếp với khách hàng ngay khi hoàn tất đăng ký tài khoản.</p>',
    },
    {
      title: 'Làm cách nào để đăng ký?',
      content:
        '<p>Chúng tôi rất vui khi bạn tham gia vào nền tảng ứng dụngTADA Truck! Vui lòng truy cập vào trang web: <a href="https://www.TADATruck.com">www.TADATruck.com</a> và thao tác theo hướng dẫn. Hãy liên hệ trực tiếp đến chúng tôi khi bạn cần hỗ trợ thêm.</p>',
    },
    {
      title: 'Yêu cầu về xe và giấy tờ để đăng ký?',
      content:
        '<p>Vui lòng đăng tải lên các giấy tờ xác thực cơ bản:</p><p>- CMND (mặt trước)</p><p>- Bằng lái xe (mặt trước)</p><p>- Đăng kiểm xe (hai trang mặt trong) hoặc Đăng ký xe (chụp mặt sau có đầy đủ thông tin xe và biển số xe)</p><p></p>Nếu bạn là doanh nghiệp vận tải, bạn cần tải lên:</p><p>- Giấy đăng ký kinh doanh (trang 1)</p><p>Khi bạn tải ảnh lên, hãy đảm bảo:</p><p>- Ảnh chụp giấy tờ gốc hoặc bản sao có công chứng</p><p>- Ảnh chụp rõ nét, nhận rõ nội dung và không có dấu vết chỉnh sửa/ tẩy xóa</p><p>Quá trình xem xét giấy tờ tải lên sẽ được TADA Truck thực hiện trong vòng 12h - 24h.</p>',
    },
    {
      title: 'Liên hệ TADA truck như thế nào?',
      content:
        '<p>Vui lòng liên hệ đến TADA Truck qua các kênh sau đây, chúng tôi luôn sẵn sàng hỗ trợ bạn</p><p>- Hotline: 1900 636 296 (từ thứ Hai đến thứ Bảy trong khung giờ từ 07AM - 08PM);</p><p>- Hộp thư hỗ trợ: hotro@tada.global</p><p>- Zalo: TADA Vietnam (0908 457 393)</p>',
    },
    {
      title: 'TADA truck có thu phí không?',
      content:
        '<p>TADA Truck là hoàn toàn miễn phí cho cả chủ hàng và chủ xe.</p>',
    },
    {
      title: 'Làm sao để nhận được đơn hàng?',
      content:
        '<p>Các đơn hàng mới đều sẽ được hiển thị tại mục Đơn hàng mới (New orders) trên tài khoản của bạn. Vui lòng thường xuyên truy cập vào tài khoản và bạn có thể kịp thời nhận được các đơn hàng phù hợp.</p>',
    },
    {
      title: 'Giá TADA Truck được tính như thế nào?',
      content:
        '<p>Bạn sẽ là bên định giá và thỏa thuận với khách hàng. Mức giá hợp lý cho cả 02 bên thì luôn được khuyến khích.</br> Hãy để khách hàng cảm thấy hài lòng khi sử dụng dịch vụ vận chuyển của bạn, từ đó kênh khách hàng thân thiết của bạn sẽ được mở rộng.</p>',
    },
    {
      title: 'Làm sao để hủy đơn hàng?',
      content:
        '<p>Để hủy đơn hàng: Tại mục Quản lý đơn hàng -> Bấm nút Hủy ngay cạnh đơn hàng muốn hủy. <br/>Đơn hàng sau khi đã được xác nhận và chỉ định thành công: vui lòng liên hệ đến TADA để yêu cầu hủy đơn hàng</p>',
    },
    {
      title: 'Cài đặt ứng dụng TADA Truck như thế nào?',
      content:
        '<p>Nếu bạn là tài xế trực tiếp thực hiện đơn hàng vận tải:</p><p>Tải ứng dụng cho iOS (iPhone): Truy cập App Store, tìm kiếm ứng dụng TADA Truck và cài đặt ngay</p><p>Tải ứng dụng dành cho Android (Samsung, Oppo, Asus, HTC, v.v): Truy cập CH Play, tìm kiếm ứng dụng TADA Truck và cài đặt ngay</p>',
    },
    {
      title: 'Ứng dụng không định vị chính xác vị trí của tôi',
      content:
        '<p>1. Hãy đảm bảo rằng thiết bị của bạn đang được kết nối với wifi hoặc Dữ liệu di động đã được bật</p><p>2. Tại mục Cài đặt của thiết bị di động, bật chế độ cho phép ứng dụng quyền truy cập Vị trí với "Độ chính xác cao"</p><p>3. Khởi động lại ứng dụng để ứng dụng bắt đầu định vị lại vị trí của bạn</p>',
    },
    {
      title: 'Quy tắc ứng xử dành cho chủ xe/ tài xế',
      content:
        '<p>TADA Truck luôn khuyến khích các ứng xử văn minh và lịch thiệp. Một số quy tắc cơ bản được xây dựng với mong muốn mang đến cho khách hàng và các đối tác vận tải một trải nghiệm an toàn và chất lượng. Chúng tôi tin tưởng vào việc xây dựng một cộng đồng thân thiện, công bằng giữa khách hàng và chủ xe/ tài xế vì chính họ sẽ được hưởng tất cả lợi ích khi sử dụng dịch vụ trên nền tảng công nghệ mà chúng tôi cung cấp.</p>',
    },
  ];
  const partner = 'partner';
  const driver = 'Driver';
  const data_en = [
    {
      title: 'How does TADA Truck works?',
      content: `<p>TADA Truck is a technology platform that connects cargo onwers and truck owners/drivers directly, helping businesses optimise costs and time for logistics needs. You can use a your own truck or your ${partner}'s truck to carry cargo on demand. You will directly connect to the customer right after completing the driver account registration and viewing the order.</p>`,
    },
    {
      title: 'How to create an account?',
      content:
        '<p>We are thrilled to have you on board with TADA Truck! Please visit: <a href="https://www.TADATruck.com">www.TADATruck.com</a> and Follow guided steps to finish creating an account with TADA Truck. If you require further assistance please feel free to contact us directly.',
    },
    {
      title: 'What are required documents?',
      content: `<p>Please upload required documents as below:</p><p>- ID card (front)</p><p>- ${driver}'s license (front)</p><p>- Vehicle registration (two inside pagess) or Vehicle registration (rear view with full vehicle information and license plates)</p><p>If you are a transport business, you need to upload:</p><p>- Business registration certificate (page 1)</p><p>When you upload photos, make sure:</p><p>- Photos of original documents or notarized copies</p><p>- Photo paper is clear, all content is easy to read</p><p>The process of reviewing uploaded documents is done within 12 hours - 24 hours.</p>`,
    },
    {
      title: 'How can I contact TADA Truck?',
      content:
        '<p>Please feel free to contact us for direct advice and answer any questions.</p><p>Contact information:</p><p>- Hotline: 1900 636 296 ( from Monday to Saturday at 07AM - 08PM)</p><p>- Email: hotro@tada.global</p><p>- Zalo: TADA Vietnam (0908 457 393)</p>',
    },
    {
      title: 'Is there any fee for using TADA Truck?',
      content:
        '<p>TADA Truck will remain a zero-commission platform so using TADA Truck is free for both Customers and Truck Owners.</p>',
    },
    {
      title: 'How to receive orders?',
      content:
        '<p>All of new orders would be notified and displayed at "New orders" section. Please login your account and check this section frequently, thus you are able to timely recieve orders.</p>',
    },
    {
      title: 'Getting a price for an order',
      content:
        '<p>You will quote and close the deal directly with customers after clicking "Accept". Please advise an appropriate price for each order. Customer satisfaction would help to expand your order pool.</p>',
    },
    {
      title: 'How to cancel an order?',
      content:
        'To cancel an order: Open "Manage Order" section and click "Delete" button displayed next to preferred order. In case your order was confirmed and assigned driver: please contact us directly to do a cancellation.',
    },
    {
      title: 'How to install TADA Truck app?',
      content:
        '<p>Download the app for iOS (iPhone): Access the App Store, search for LOGIVAN application and install now</p><p>Download the application for Android (Samsung, Oppo, Asus, HTC, etc): Access Google Play, search for LOGIVAN application truck owners and install immediately</p>',
    },
    {
      title: 'The app does not detect my location correctly',
      content:
        '<p>1. Ensure that your mobile data/ wifi is turned on</p><p>2. Go to "Settings" and select "Location"</p><p>3. Ensure that mode is set "High Accuracy" then refesh the app</p>',
    },
    {
      title: 'Driver Code of Conduct',
      content:
        '<p>TADA Truck constantly strive to encourage high standard of professional service. Hope that basic rules are designed to bring safe and satisfied experiences to Customers and Truck owers/ Drivers. We believe in building a Customer & Truck operator-friendly community that is fair and will be enjoyed by all when using our flatform.</p>',
    },
  ];
  const data_kr = [
    {
      title: 'TADA Truck이란?',
      content:
        '<p>TADA Truck은 고객(화물 운송 업체)과 트럭 사업자 / 운전자를 직접 연결하는 플랫폼으로, 기업의 요구에 맞추어 비용과 시간을 최적화할 수 있도록 지원합니다. 고객님(트럭 사업자 고객)은 소유 트럭이나 파트너 트럭을 화물을 배송하기 위해 사용할 수 있습니다. 운전자 계정 등록이 완료되면, 화주 고객에게 직접 연락하고 주문을 확인하실 수 있습니다.</p>',
    },
    {
      title: '계정 등록은 어떻게 하나요?',
      content:
        '<p>TADA 트럭과 함께하게 되어 기쁩니다! <a href="https://www.TADATruck.com">www.TADATruck.com</a>를 방문하여 안내에 따라 TADA Truck 계정 생성을 완료하세요. 추가 지원이 필요하면 언제든지 저희에게 직접 연락하십시오.</p>',
    },
    {
      title: '요구되는 서류는 무엇입니까?',
      content: `<p>아래의 서류를 업로드해 주시기 바랍니다: </p><p>- 신분증 (앞면)</p><p>- ${driver} 운전 면허증 (앞면)</p><p>- 차량 등록증(앞면, 뒷면)</p><p>운송 사업자라면, 아래의 서류도 업로드해 주시기 바랍니다: </p><p>- 사업자 등록증 (1페이지)</p><p>사진을 업로드 하실 때, 다음 사항을 주의하여 주십시오:</p><p>- 원본 및 공증된 사본의 사진 파일이어야 함.</p><p>- 사진 파일이 명확하여, 모든 내용을 쉽게 읽을 수 있어야 함.</p><p>서류 업로드는 12시간~24시간 내에 이루어 져야 합니다.</p>`,
    },
    {
      title: 'TADA Truck에 어떻게 연락할 수 있습니까?',
      content:
        '<p>상담원과의 연결을 원하시면 언제든지 연락주십시오.</p><p>연락처 정보 :</p><p>- 핫라인: 1900 636 296 (월요일 ~ 토요일 오전 7시 ~ 오후 8시)</p><p>- 이메일: hotro@tada.global</p>',
    },
    {
      title: 'TADA Truck 사용 수수료가 있나요?',
      content:
        '<p>TADA Truck은 제로 커미션 플랫폼으로 TADA Truck을 사용하는 고객과 트럭 사업자 모두에게 무료입니다.</p>',
    },
    {
      title: '주문은 어떻게 수락하나요?',
      content:
        '<p>새로운 주문" 메뉴에서 모든 새로운 주문을 확인하실 수 있습니다. 알맞은 주문을 제때에 수락할 수 있도록 로그인 후, 이 메뉴를 자주 확인해 주세요.</p>',
    },
    {
      title: '내 주문의 요금은?',
      content:
        '<p>"승인" 을 클릭하신 후, 화주 고객과 직접적으로 계약을 협상할 수 있습니다. 양쪽 모두에게 적합한 가격을 제시해 주시기 바랍니다. 화주 고객의 만족은 고객님(트럭 사업자)의 주문 풀을 확장시키는 데 큰 도움이 될 것입니다.</p>',
    },
    {
      title: '주문은 어떻게 취소하나요?',
      content:
        '<p>주문 취소를 위해 "주문 관리" 메뉴에서 "삭제 버튼"을 클릭해 주세요. 주문이 확정되었거나 배송기사에게 배정되었다면, 취소를 위해 저희에게 직접 연락해 주시기 바랍니다.</p>',
    },
    {
      title: 'TADA Truck 애플리케이션은 어떻게 설치하나요?',
      content:
        '<p>iOS (iPhone)에서 다운로드: 앱스토어에서 LOGIVAN 애플리케이션을 검색 후 설치해 주세요. Android (Samsung, Oppo, Asus, HTC, etc)에서 다운로드: Google Play 스토어에서, LOGIVAN application truck owners을 설치해 주세요.</p>',
    },
    {
      title: '애플리케이션이 저의 위치를 정확히 찾지 못합니다.',
      content:
        '<p>1. 모바일 데이터 또는 와이파이가 현재 켜져 있는지 확인해 주세요.</p><p>2. "설정" 메뉴에서 "위치" 를 선택해 주세요.</p><p>3. "High Accuracy" 모드를 설정하신 후 애플리케이션을 재부팅해 주세요.</p>',
    },
    {
      title: '트럭 사업자 행동 규칙',
      content:
        '<p>TADA Truck은 지속적이고 높은 수준의 전문적인 서비스를 지향합니다. 이 원칙이 고객(화주)과 트럭 사업자 고객 모두에게 안전하고 만족스러운 경험을 가져다 주기를 바랍니다. 우리는 고객(화주)과 트럭 사업자가 우리의 플랫폼 내에서 공정한 커뮤니티를 형성하는 것이 모두에게 즐거움과 이익이 되는 길이라 믿습니다.</p>',
    },
  ];

  let lang = null;
  switch (langStore?.activeLanguage) {
    case 'en': {
      lang = data_en;
      break;
    }
    case 'vi': {
      lang = data;
      break;
    }
    case 'kr': {
      lang = data_kr;
      break;
    }
  }

  return (
    <>
      <WrapperTheme>
        <AccordionContent title={t(TOPMENU_FAQ)} data={lang ? lang : data} />
      </WrapperTheme>
    </>
  );
};

export default observer(FaqTruckOwnerPage);
