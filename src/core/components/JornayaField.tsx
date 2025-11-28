/**
 * JornayaField Component
 * Renders the hidden input field required by Jornaya LeadID tracking
 *
 * CRITICAL: This field MUST exist in the form BEFORE the Jornaya script loads.
 * The Jornaya script will populate the value of this pre-existing field.
 *
 * Official Jornaya Implementation Pattern:
 * <form>
 *   <input id="leadid_token" name="universal_leadid" type="hidden" value=""/>
 *   ... other form fields ...
 * </form>
 */

export const JornayaField: React.FC = () => {
  return (
    <input
      id="leadid_token"
      name="universal_leadid"
      type="hidden"
      value=""
    />
  );
};
