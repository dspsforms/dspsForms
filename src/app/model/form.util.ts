export class FormName {

  static INTAKE_FORM = 'intakeForm';
  static ALT_MEDIA_REQUEST = 'altMediaRequest';
  static APPLICATION_FOR_SERVICES = 'applicationForServices';
  static EMERGENCY_EVAC_INFO = 'emergencyEvacInfo';
  static FEEDBACK = 'feedback';
  static COMPLAINT = 'complaint';
  static HISTORY_OF_DISABILITY = "historyOfDisability";


  static formNames = [
    FormName.INTAKE_FORM,
    FormName.ALT_MEDIA_REQUEST,
    FormName.APPLICATION_FOR_SERVICES,
    FormName.EMERGENCY_EVAC_INFO,
    FormName.FEEDBACK,
    FormName.COMPLAINT,
    FormName.HISTORY_OF_DISABILITY
  ];

  // 3/29/2022 only some forms are now reqd 
  // this solution is a kludge 
  static activeFormNames = [
    // FormName.INTAKE_FORM,
    FormName.ALT_MEDIA_REQUEST,
    // FormName.APPLICATION_FOR_SERVICES,
    // FormName.EMERGENCY_EVAC_INFO,
    FormName.FEEDBACK,
    FormName.COMPLAINT,
    FormName.HISTORY_OF_DISABILITY
  ];



}

export class FormUtil {

  private static initialized = false;

  private static formMap = {};

  // mongo collections are named intakeforms, etc.
  private static mongo2FormNameMap = {};

  private static initializeIfNecessary() {
        if (!FormUtil.initialized) {

          FormUtil.formMap[FormName.INTAKE_FORM] = "Student Intake Form";

          FormUtil.formMap[FormName.ALT_MEDIA_REQUEST] = "Alternate Format Request Form";

          FormUtil.formMap[FormName.APPLICATION_FOR_SERVICES] = "Application for DSPS Services";

          FormUtil.formMap[FormName.EMERGENCY_EVAC_INFO] = "Emergency Evacuation Information";

          FormUtil.formMap[FormName.FEEDBACK] = "Feedback";

          FormUtil.formMap[FormName.COMPLAINT] = "DSPS Complaint/Grievance Form";

          FormUtil.formMap[FormName.HISTORY_OF_DISABILITY] = "History of Disability Questionnaire";


          // mongo collections are named intakeforms, etc.
          FormUtil.mongo2FormNameMap["intakeforms"] = FormName.INTAKE_FORM;
          FormUtil.mongo2FormNameMap["altmediarequests"] = FormName.ALT_MEDIA_REQUEST;
          FormUtil.mongo2FormNameMap["applicationforservices"] = FormName.APPLICATION_FOR_SERVICES;
          FormUtil.mongo2FormNameMap["emergencyevacinfos"] = FormName.EMERGENCY_EVAC_INFO;
          FormUtil.mongo2FormNameMap["feedbacks"] = FormName.FEEDBACK;
          FormUtil.mongo2FormNameMap["complaints"] = FormName.COMPLAINT;

          FormUtil.mongo2FormNameMap["historyofdisabilities"] = FormName.HISTORY_OF_DISABILITY;


          FormUtil.initialized = true;
        }

  }

    // return the label/title for a formName
    static formTitle(formName) {
        try {
            FormUtil.initializeIfNecessary();
            return FormUtil.formMap[formName];

        } catch (err) { }
    }

    static collection2Title(collectionName) {
      try {

          FormUtil.initializeIfNecessary();
          const formName =  FormUtil.collection2FormName(collectionName);
          return FormUtil.formMap[formName];
      } catch (err) { }
    }

    static collection2FormName(collectionName) {
      try {

          FormUtil.initializeIfNecessary();
          const formName =  FormUtil.mongo2FormNameMap[collectionName];
          return formName;
      } catch (err) { }
    }

}

