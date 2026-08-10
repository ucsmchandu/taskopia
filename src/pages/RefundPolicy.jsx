import React from "react";

const RefundPolicy = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-8 py-24">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-2 h-12 bg-gray-900"></div>

            <div>
              <h1 className="text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Cancellation & Refund Policy
              </h1>

              <p className="text-sm text-gray-600 mb-6">
                Last Updated: August 10, 2026
              </p>

              <p className="text-base text-gray-700 leading-relaxed max-w-2xl font-light">
                This Cancellation & Refund Policy explains how cancellations,
                refunds, disputes, and payment-related issues are handled on
                Taskopia. Taskopia connects Hosts who post short-term tasks
                with Allies who perform those tasks.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl space-y-12">
          {/* Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Policy Overview
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia aims to provide a fair and transparent process for
              handling task cancellations and refund requests. Refund
              eligibility may depend on the stage of the task, the reason for
              cancellation, whether work has already started, and the outcome
              of any dispute between the Host and Ally.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              Because Taskopia facilitates transactions between users, a refund
              does not automatically apply to every cancellation. Each case may
              be evaluated based on the circumstances of the task and the
              information available to Taskopia.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 1. Host Cancellation */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              1. Host Cancellation
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              A Host may cancel a task before the Ally has started performing
              the task. Where the task has not started and no services have
              been performed, the Host may generally be eligible for a full
              refund of the task payment, subject to applicable payment
              processing conditions.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              If the Host cancels after the Ally has started working on the
              task, the refund amount may be reduced or determined through the
              dispute resolution process, depending on the amount of work
              completed and the circumstances of the cancellation.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 2. Ally Cancellation */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              2. Ally Cancellation or Failure to Perform
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              If an Ally cancels a task before starting the work, the Host may
              generally be eligible for a refund of the task payment.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              If an Ally accepts a task but fails to attend, fails to begin the
              task without a valid reason, or does not perform the agreed work,
              the Host may report the issue to Taskopia. After reviewing the
              circumstances, Taskopia may approve a full or partial refund.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 3. Task Started */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              3. Tasks That Have Already Started
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              Once an Ally has started performing a task, a full refund is not
              automatically guaranteed. If the task is cancelled after work
              has begun, Taskopia may consider the work already performed,
              expenses reasonably incurred, and the original task
              requirements.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              Depending on the circumstances, Taskopia may approve a partial
              refund, full refund, or no refund.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 4. Incomplete / Unsatisfactory */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              4. Incomplete or Unsatisfactory Task
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              If an Ally does not complete the task according to the agreed
              task description, the Host may raise a dispute through Taskopia.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia may review the original task description, communications
              between the users, task status, completion evidence, and other
              relevant information before determining whether a refund or
              partial refund is appropriate.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              A refund will not normally be granted solely because a Host
              expected work that was not included in the original task
              description.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 5. Disputes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              5. Disputes Between Hosts and Allies
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              If a Host and Ally disagree about the completion or quality of a
              task, either party may raise a dispute through Taskopia.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              The parties may be required to provide relevant information or
              evidence, including task details, messages, photographs,
              completion information, timestamps, or other material relevant to
              the dispute.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia will review the available information and may determine
              whether the appropriate outcome is a full refund, partial refund,
              payment to the Ally, or another appropriate resolution.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 6. No Refund */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              6. Situations Where a Refund May Not Be Provided
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              A refund may not be provided in circumstances including, but not
              limited to:
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-sm">
              <li>
                The Ally has successfully completed the agreed task.
              </li>
              <li>
                The Host changes their mind after the task has been
                substantially completed.
              </li>
              <li>
                The refund request is based on requirements that were not part
                of the original task description.
              </li>
              <li>
                The user provides false, misleading, or incomplete information
                in support of a refund request.
              </li>
              <li>
                The refund request is determined to be abusive or fraudulent.
              </li>
            </ul>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 7. Payment Failure */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              7. Failed or Duplicate Payments
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              If a payment fails but the user's bank account or payment method
              has been debited, the transaction will be handled according to
              the applicable payment provider's transaction and reversal
              process.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              If a user is charged more than once for the same Taskopia
              transaction, the duplicate transaction may be eligible for a
              refund after verification.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 8. Refund Amount */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              8. Refund Amount and Applicable Charges
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              The amount refunded may depend on the circumstances of the
              cancellation or dispute. Where applicable, payment processing
              charges, platform fees, or other transaction-related charges may
              be treated separately in accordance with Taskopia's applicable
              terms and the payment provider's rules.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia will communicate the applicable refund amount when a
              refund request is approved.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 9. Refund Processing */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              9. Refund Processing Time
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              Once a refund has been approved, Taskopia will initiate the
              refund through its payment service provider, where applicable.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              The time required for the refunded amount to appear in the
              customer's account may depend on the payment method, payment
              service provider, bank, or other financial institution involved
              in the transaction.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia does not guarantee that all refunds will be credited
              within a specific number of banking days because processing times
              may vary between payment providers and financial institutions.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 10. Refund Method */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              10. Refund Method
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              Where supported, refunds will generally be processed to the
              original payment method used for the transaction. Taskopia may
              request additional information when required to process or verify
              a refund.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 11. Refund Abuse */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              11. Fraudulent or Abusive Refund Requests
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia may reject refund requests that appear to involve
              fraudulent activity, false claims, manipulation of task
              information, repeated refund abuse, or other misuse of the
              platform.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia may also take appropriate action against accounts that
              repeatedly misuse the cancellation or refund process.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 12. Policy Changes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              12. Changes to This Policy
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia may update this Cancellation & Refund Policy from time
              to time to reflect changes to its services, payment systems,
              business practices, or applicable requirements. The updated
              policy will be published on this page with a revised "Last
              Updated" date.
            </p>
          </section>

          <div className="h-px bg-gray-300"></div>

          {/* 13. Contact */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              13. Contact and Refund Requests
            </h2>

            <p className="text-gray-700 leading-relaxed text-sm">
              Users who believe they are eligible for a refund should contact
              Taskopia through the available support channels and provide the
              relevant task and transaction details.
            </p>

            <p className="text-gray-700 leading-relaxed text-sm">
              Taskopia may request additional information to verify the
              transaction and evaluate the refund request.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-20 border-t-2 border-gray-300">
          <div className="max-w-2xl">
            <p className="text-xs text-gray-600 leading-relaxed">
              This Cancellation & Refund Policy applies to transactions and
              tasks conducted through Taskopia and should be read together
              with Taskopia's Terms of Service, Privacy Policy, and other
              applicable policies.
            </p>
          </div>
        </div>
      </div>

      <div className="h-1 mt-24"></div>
    </div>
  );
};

export default RefundPolicy;