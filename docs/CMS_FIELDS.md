# CMS 字段总览 V3.2

## Page

- title
- slug
- navLabel
- route
- heroEyebrow
- heroTitle
- heroSummary
- seoTitle
- seoDescription
- ogImage
- sections(JSON)
- complianceNote
- status

## Industry / Platform

用于沐洋智联、星藤智能科技、企业AI技术效能增长平台、APEX 等产业布局内容。

- title
- slug
- eyebrow
- relation
- summary
- points(JSON)
- priority
- isCurrentFocus
- isStrategicReserved
- complianceCategory: general / quant / growth / data / reserved
- seoTitle
- seoDescription

## Capability

用于 AI 引擎六类能力。

- title
- slug
- summary
- useCases(JSON)
- priority
- complianceNote

## Article

用于星橡智库。

- title
- slug
- category: 观点 / 产业观察 / 研究报告 / 项目动态 / 管理层表达
- summary
- body
- tags(JSON)
- cover
- seoTitle
- seoDescription
- requiresComplianceReview

## Report

- title
- slug
- summary
- status: planned / available / private
- cover
- file
- requiresLead
- complianceNote

## Lead

统一承接三类表单。

- leadType: ecosystem / contact / intelligence
- name
- company
- email
- phone
- topic
- message
- consent
- sourcePath
- owner
- status: new / assigned / reviewing / contacted / closed / spam
- priority: low / normal / high
- complianceReviewRequired
- notes
- ip
- userAgent
- utm(JSON)
- receivedAt
