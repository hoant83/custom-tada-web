/* eslint-disable jsx-a11y/anchor-is-valid */
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { TruckOwnerStoreContext } from '../../truckowner.store';
import {
  TRUCKOWNER_ACTION_ROUTERS,
  TRUCKOWNER_ROUTERS,
} from '../../router.enum';
import truckownerService from '../../truckowner.service';
import { THANKYOU_ACTION } from '../../truckowner.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

let interval: any = null;

const TruckOwnerRegisterOTPForm = (props: ComponentProps) => {
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const { isSendOTPSuccess } = truckOwnerStore;
  const history = useHistory();

  /*
   * Getting parameter from the route
   */
  const { phoneNumber, id } = useParams() as any;

  /*
   * Props of Component
   */
  const { className, style, children } = props;

  /**
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_LOGIN,
    ACCOUNT_VERIFY_OTP,
    ACCOUNT_VERIFY_OTP_PLEASE_INPUT_CODE,
    ACCOUNT_VERIFY_OTP_RETRY,
    ACCOUNT_VERIFY_OTP_CONFIRM,
    ACCOUNT_VERIFY_OTP_INVALID,
    ACCOUNT_VERIFY_OTP_INVALID_DESC,
    ACCOUNT_OR,
    ACCOUNT_VERIFY_BY_EMAIL,
  } = I18N;

  /**
   * State storage OTP code
   */
  const [otpCode, setOtpCode] = React.useState<string>('');

  /**
   * State storage time count when resend OTP (60s)
   */
  const [timeCount, setTimeCount] = React.useState<number>(0);

  /**
   * Function handle change OTP code
   */
  const handleChangeOtpCode = (value: any) => {
    setOtpCode(value);
  };

  /**
   * Function handle confirm OTP
   */
  const handleConfirmOTP = async () => {
    const result = await truckOwnerStore.verifyOtp(
      phoneNumber,
      parseInt(otpCode)
    );
    if (result) {
      history.push(TRUCKOWNER_ROUTERS.VERIFED_ACCOUNT);
    }
  };

  /**
   * Function handle send OTP
   */
  const handleSendOTP = () => {
    if (timeCount !== 0) return;
    truckOwnerStore.sendOTP(phoneNumber);
    setTimeCount(60);
    interval = setInterval(() => {
      setTimeCount((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  /**
   * Handle send mail verification
   */
  const handleSendMailVerification = async () => {
    const resultSendMail = await truckownerService.sendMailVerification(
      phoneNumber
    );
    if (resultSendMail) {
      history.push(
        TRUCKOWNER_ACTION_ROUTERS.THANKYOU + THANKYOU_ACTION.REGISTER
      );
    }
  };

  const handleLogin = () => {
    history.push(TRUCKOWNER_ROUTERS.LOGIN);
  };

  React.useEffect(() => {
    handleSendOTP();
    return () => clearTimeout(interval);
  }, []);

  return (
    <>
      <div className={`block-verify-otp ${className ? className : ''}`}>
        <Card style={style}>
          <Card.Body>
            <Card.Title className="block-title">
              {t(
                isSendOTPSuccess === false
                  ? ACCOUNT_VERIFY_OTP_INVALID
                  : ACCOUNT_VERIFY_OTP
              )}
            </Card.Title>
            {isSendOTPSuccess !== null && (
              <>
                {isSendOTPSuccess === true ? (
                  <>
                    {' '}
                    <OtpInput
                      className="input-otp"
                      containerStyle={{ justifyContent: 'center' }}
                      value={otpCode}
                      onChange={handleChangeOtpCode}
                      numInputs={6}
                      isInputNum
                    />
                    <Card.Text>
                      {t(ACCOUNT_VERIFY_OTP_PLEASE_INPUT_CODE)} {phoneNumber}{' '}
                      <Button
                        variant="link"
                        className="resend-otp-link"
                        onClick={handleSendOTP}
                      >
                        {t(ACCOUNT_VERIFY_OTP_RETRY)}{' '}
                        {timeCount !== 0 && `(${timeCount})`}
                      </Button>
                    </Card.Text>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleConfirmOTP}
                    >
                      <span>{t(ACCOUNT_VERIFY_OTP_CONFIRM)}</span>
                      <i className="ico ico-o-next"></i>
                    </Button>
                    <div style={{ marginTop: 24 }}>{t(ACCOUNT_OR)}</div>
                    <div style={{ marginTop: 16 }}>
                      <a href="#" onClick={() => handleSendMailVerification()}>
                        {t(ACCOUNT_VERIFY_BY_EMAIL)}
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <Card.Text>{t(ACCOUNT_VERIFY_OTP_INVALID_DESC)}</Card.Text>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleLogin}
                    >
                      <span>{t(BUTTONS_LOGIN)}</span>
                      <i className="ico ico-o-next"></i>
                    </Button>
                  </>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default observer(TruckOwnerRegisterOTPForm);
