import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Form } from 'react-bootstrap';
import {
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
  withStyles,
} from '@material-ui/core';

import StepConnector from '@material-ui/core/StepConnector';
import { StepIconProps } from '@material-ui/core/StepIcon';
import clsx from 'clsx';
import { I18N } from '@/modules/lang/i18n.enum';
import NewOrderPage from '@/modules/order/pages/front/NewOrder';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import PendingOrderPage from '@/modules/order/pages/front/PendingOrder';
import DeliveringOrderPage from '@/modules/order/pages/front/DeliveringOrder';
import { STEPS } from '@/libs/constants/step.constants';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient(90deg, #0a2e3d 0%, #1f3c47 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient(90deg, #0a2e3d 0%, #1f3c47 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage: 'linear-gradient(90deg, #0a2e3d 0%, #1f3c47 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage: 'linear-gradient(90deg, #0a2e3d 0%, #1f3c47 100%)',
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {props.icon}
    </div>
  );
}

const TruckOwnerOrdersPage = () => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    JOB_ONGOING_TITLE,
    ORDER_NEW_TITLE,
    ORDER_PENDING_TITLE,
    TRUCKOWNER_MY_ORDERS,
    BUTTONS_BACK_STEP,
  } = I18N;

  const stepTitle = [ORDER_NEW_TITLE, ORDER_PENDING_TITLE, JOB_ONGOING_TITLE];
  const [stepNumber, setStepNumber] = React.useState<number>(0);
  const steps = [STEPS.FRIST_STEP, STEPS.SECOND_STEP, STEPS.THIRD_STEP];

  const handleStep = (result: boolean) => {
    if (result) {
      setStepNumber(stepNumber + 1);
    } else {
      setStepNumber(stepNumber - 1);
    }
  };

  const handleBack = () => {
    setStepNumber(stepNumber - 1);
  };

  return (
    <>
      <WrapperTheme pageTitle={t(TRUCKOWNER_MY_ORDERS)}>
        <div className="form multi-step-truckowner">
          <React.Fragment>
            <Stepper
              activeStep={stepNumber}
              connector={<QontoConnector />}
              className="steper-new-order"
            >
              {steps.map((u, index) => (
                <Step key={index}>
                  <StepLabel
                    onClick={async () => {
                      setStepNumber(index);
                    }}
                    StepIconComponent={ColorlibStepIcon}
                  />
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              <Typography component="h4" variant="h4" align="center">
                {t(stepTitle[stepNumber]).toUpperCase()}
              </Typography>
              {stepNumber === steps.length ? (
                <>success</>
              ) : (
                <>
                  <Form
                    autoComplete="off"
                    className={`form-step-${stepNumber} multiple-step-form`}
                    onSubmit={(e) => {
                      e.preventDefault();
                      // handleSubmit();
                    }}
                  >
                    {stepNumber === STEPS.FRIST_STEP && (
                      <div style={{ marginTop: '32px' }}>
                        <Container fluid>
                          <NewOrderPage handleStep={handleStep} />
                        </Container>
                      </div>
                    )}
                    {stepNumber === STEPS.SECOND_STEP && (
                      <div style={{ marginTop: '32px' }}>
                        <Container fluid>
                          <PendingOrderPage handleStep={handleStep} />
                        </Container>
                      </div>
                    )}
                    {stepNumber === STEPS.THIRD_STEP && (
                      <div style={{ marginTop: '32px' }}>
                        <Container fluid>
                          <DeliveringOrderPage />
                        </Container>
                      </div>
                    )}

                    <div className="step-container">
                      {stepNumber !== 0 && (
                        <Button
                          className="previous-step-btn"
                          onClick={handleBack}
                        >
                          {t(BUTTONS_BACK_STEP)}
                        </Button>
                      )}
                    </div>
                  </Form>
                </>
              )}
            </React.Fragment>
          </React.Fragment>
        </div>
      </WrapperTheme>
    </>
  );
};

export default observer(TruckOwnerOrdersPage);
