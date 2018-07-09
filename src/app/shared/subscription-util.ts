export class SubscriptionUtil {

    static unsubscribe(s) {
        try {
            if (s != null) {
                s.unsubscribe();
            }
        } catch (err) { }
    }
}
