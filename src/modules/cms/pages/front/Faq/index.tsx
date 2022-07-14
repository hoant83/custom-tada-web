import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import AccordionContent from '@/modules/cms/components/AccordionContent';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { LanguageStoreContext } from '@/modules/lang/lang.store';

const FaqPage = () => {
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
        '<p>We are thrilled to have you on board with TADA Truck! Please visit: <a href="http://www.TADATruck.com">www.TADATruck.com</a> and Follow guided steps to finish creating an account with TADA Truck. If you require further assistance please feel free to contact us directly.',
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
        '<p>TADA Truck은 고객(화물 운송 업체)과 트럭 사업자 / 운전자를 직접 연결하는 플랫폼으로, 기업의 요구에 맞추어 비용과 시간을 최적화할 수 있도록 지원합니다.</p>',
    },
    {
      title: '계정 등록은 어떻게 하나요?',
      content:
        '<p>TADA 트럭과 함께하게 되어 기쁩니다! <a href="https://www.TADATruck.com">www.TADATruck.com</a>를 방문하여 안내에 따라 TADA Truck 계정 생성을 완료하세요. 추가 지원이 필요하면 언제든지 저희에게 직접 연락하십시오.</p>',
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
      title: 'TADA Truck은 어떤 유형의 차량을 지원합니까?',
      content:
        '<p>당사의 운송 파트너 네트워크는 현재 간단한 적재 트럭에서 컨테이너까지 다양한 유형의 차량을 보유하고 있습니다</p>',
    },
    {
      title: '주문 생성은 어떻게 하면되나요?',
      content:
        '<p>TADA Truck flatform에서 주문하는 방법은 다음과 같습니다.</p><p>1. 계정에 로그인</p><p>2. "주문 생성" 메뉴에서 세부 정보를 입력하십시오. (*)는 필수 항목입니다.</p><p>새 주문 생성에 대한 지원이 필요한 경우 다음을 통해 주문 세부 정보를 상담원의 질문에 따라 상세히 답변해주세요.</p><p>-핫라인 :</p><p>1900636296 (월요일 ~ 토요일 오전 7시 ~ 오후 8시)</p>',
    },
    {
      title: '내 주문의 요금은?',
      content:
        '<p>주문 생성 메뉴에서 "가격을 설정하시겠습니까?"에 원하시는 요금을 입력하시면 주문 알람을 받은 트럭회사에서 확인 및 수락을 진행할 것입니다.</p><p class="faq-highlight">미입력시, 트럭 운전자가 직접 연락하여 가격을 제시하고 주문을 확인합니다.</p>',
    },
    {
      title: 'TADA Truck 결제 방식은 어떻게 되나요?',
      content:
        '<p>고객은 트럭 사업자에게 직접 지불을 해야합니다.TADA Truck은 어떠한 중간 수수료도 징수하지 않습니다.\n' +
        '지불 방법, 정산, 기간 등을 트럭 소유주와 논의 후 진행하시면 됩니다. (계약서 진행) </p>',
    },
    {
      title: 'VAT 인보이스는 어떻게 받을 수 있습니까?',
      content:
        '<p>주문 생성을 진행하는 과정에서 "VAT 인보이스가 필요하십니까?" 항목에 \'예\'를 클릭하십시오.\n' +
        '또는 온라인 이외 채널 (핫라인/이메일) 에서 진행하는 경우 상담원에게 요청하시면 됩니다.\n' +
        'VAT 인보이스 발행은 트럭회사에서 진행합니다.</p>',
    },
    {
      title: '원하는 트럭 사업자를 고를 수 있습니까?',
      content:
        '<p>네. 당연합니다. 계정 설정 메뉴에서 즐겨 찾는 트럭 사업자를 업데이트 해놓으면 다음 새 주문을 생성할 때, 보다 빠르게 해당 회사 및 운전자를 선택할 수 있습니다.</p>',
    },
    {
      title: '내 주문을 수정할 수 있나요?',
      content:
        '<p>트럭 사업자와 매칭되기 전 또는 후에 주문 세부 정보를 편집할 수 있습니다. \n' +
        '주문을 열고 편집한 다음 페이지 하단의 "업데이트" 버튼을 클릭하십시오.\n' +
        '주문이 확인되고 배정된 경우 : 영업 시간 내에 1900 636 296 또는 hotro@tada.global을 통해 문의하십시오.</p>',
    },
    {
      title: '주문 취소는 어떻게 하나요?',
      content:
        '<p>트럭 사업자와 매칭되기 전 또는 후에 주문를 취소할 수 있습니다. \n' +
        '주문를 열고 페이지 하단의 ""취소""버튼을 누르십시오.\n' +
        '주문이 확인되고 배정된 경우 : 영업 시간에 1900 636 296 또는 hotro@tada.global로 연락하여 취소하십시오.</p>',
    },
    {
      title: '내 주문이 트럭 사업자에 의해 취소되었습니다',
      content:
        '<p>"트럭 사업자 또는 운전자가 주문을 취소할 수 있습니다. \n' +
        '취소할 경우 주문이 다른 트럭 사업자 또는 운전자에게 다시 전송됩니다.\n' +
        '핫라인 또는 이메일을 통해 문의 가능합니다."</p>',
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
    case 'id': {
      lang = data_en;
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

export default observer(FaqPage);
