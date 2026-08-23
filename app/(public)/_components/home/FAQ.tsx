const faqs = [
  {
    question: "How do I find a property on RentNest?",
    answer:
      "Browse the properties page and use the available search and filters to find a property that matches your needs.",
  },
  {
    question: "Can I submit a rental request?",
    answer:
      "Yes. Once you find a property you like, you can view its details and submit a rental request if you are logged in.",
  },
  {
    question: "Can landlords list their properties?",
    answer:
      "Yes. Landlords can create an account and add their properties to RentNest for potential tenants to discover.",
  },
  {
    question: "How does the rental request work?",
    answer:
      "After submitting a request, the landlord can review it and approve or reject the request from their dashboard.",
  },
]

export default function FAQ() {
  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium text-primary">
            FAQ
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>

          <p className="mt-3 text-sm text-muted-foreground">
            Everything you need to know about renting with RentNest.
          </p>
        </div>

        <div className="mt-10 divide-y rounded-2xl border bg-background">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group p-5"
            >
              <summary className="cursor-pointer list-none text-sm font-medium">
                <div className="flex items-center justify-between gap-4">
                  {faq.question}

                  <span className="text-xl font-light text-muted-foreground transition-transform group-open:rotate-45">
                    +
                  </span>
                </div>
              </summary>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}